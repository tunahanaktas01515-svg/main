'use strict';

const { app, BrowserWindow, Menu, net, protocol, screen, shell } = require('electron');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

/**
 * Cenan masaüstü kabuğu.
 *
 * Arayüz kodu hiç değiştirilmeden çalışır: geliştirmede Vite dev sunucusu,
 * üretimde `dist` klasörünü servis eden özel `app://` şeması yüklenir.
 * Özel şema sayesinde arayüzdeki `/orb/orb.webp` gibi mutlak yollar
 * `file://` protokolünde olduğu gibi bozulmaz.
 */

/** `npm run electron:dev` bu değişkeni doldurur; doluysa geliştirme modundayız. */
const devServerUrl = process.env.VITE_DEV_SERVER_URL;
const isDev = Boolean(devServerUrl);

const APP_SCHEME = 'app';
const APP_ORIGIN = `${APP_SCHEME}://cenan`;
const rendererRoot = path.resolve(__dirname, '..', 'dist');

// Şema, `app` hazır olmadan önce ayrıcalıklı olarak tanıtılmalı; aksi halde
// ES modülleri ve fetch çağrıları güvensiz köken sayılıp engellenir.
protocol.registerSchemesAsPrivileged([
  {
    scheme: APP_SCHEME,
    privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true },
  },
]);

/** `app://cenan/...` isteklerini `dist` klasöründeki dosyalara bağlar. */
function registerAppProtocol() {
  protocol.handle(APP_SCHEME, async (request) => {
    const { pathname } = new URL(request.url);
    const requestedPath = decodeURIComponent(pathname);
    const resolved = path.resolve(rendererRoot, `.${requestedPath}`);

    // `dist` dışına çıkmaya çalışan yolları reddet
    if (resolved !== rendererRoot && !resolved.startsWith(rendererRoot + path.sep)) {
      return new Response('Not found', { status: 404 });
    }

    const target = requestedPath === '/' ? path.join(rendererRoot, 'index.html') : resolved;

    try {
      return await net.fetch(pathToFileURL(target).toString());
    } catch {
      // Uzantısız yollar için tek sayfalık arayüze geri dön
      if (!path.extname(target)) {
        return net.fetch(pathToFileURL(path.join(rendererRoot, 'index.html')).toString());
      }
      return new Response('Not found', { status: 404 });
    }
  });
}

/** Kopyala/yapıştır gibi kısayolların çalışması için standart rollerden menü kurar. */
function applyApplicationMenu() {
  const isMac = process.platform === 'darwin';

  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      ...(isMac ? [{ role: 'appMenu' }] : []),
      { role: 'fileMenu' },
      { role: 'editMenu' },
      { role: 'viewMenu' },
      { role: 'windowMenu' },
    ])
  );
}

/** Adres http(s) ise varsayılan tarayıcıda açar. */
function openExternally(url) {
  try {
    if (/^https?:$/.test(new URL(url).protocol)) shell.openExternal(url);
  } catch {
    // Ayrıştırılamayan adresler yok sayılır
  }
}

function isInternalUrl(url) {
  if (isDev) return url.startsWith(devServerUrl);
  try {
    return new URL(url).origin === APP_ORIGIN;
  } catch {
    return false;
  }
}

function createWindow() {
  const { workAreaSize } = screen.getPrimaryDisplay();

  const window = new BrowserWindow({
    width: Math.min(1560, workAreaSize.width),
    height: Math.min(980, workAreaSize.height),
    minWidth: 1180,
    minHeight: 760,
    // Arayüzün koyu zemini yüklenene kadar beyaz parlama olmasın
    backgroundColor: '#050505',
    show: false,
    title: 'Cenan',
    // Menü çubuğu arayüzün görünümünü değiştirmesin (Alt ile açılabilir)
    autoHideMenuBar: process.platform !== 'darwin',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
    },
  });

  window.once('ready-to-show', () => window.show());

  // Yeni sekme/pencere açan bağlantılar tarayıcıya yönlendirilir
  window.webContents.setWindowOpenHandler(({ url }) => {
    openExternally(url);
    return { action: 'deny' };
  });

  // Pencere uygulamanın dışına yönlendirilemez
  window.webContents.on('will-navigate', (event, url) => {
    if (isInternalUrl(url)) return;
    event.preventDefault();
    openExternally(url);
  });

  window.loadURL(isDev ? devServerUrl : `${APP_ORIGIN}/`);

  return window;
}

// Aynı anda tek örnek çalışsın; ikinci kez açılırsa mevcut pencere öne gelsin
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    const [window] = BrowserWindow.getAllWindows();
    if (!window) return;
    if (window.isMinimized()) window.restore();
    window.focus();
  });

  app.whenReady().then(() => {
    app.setAppUserModelId('com.cenan.desktop');
    if (!isDev) registerAppProtocol();
    applyApplicationMenu();
    createWindow();

    // macOS'ta Dock ikonuna tıklanınca pencere yeniden açılır
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}

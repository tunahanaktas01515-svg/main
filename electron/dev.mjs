import { spawn } from 'node:child_process';
import process from 'node:process';
import electronPath from 'electron';
import { createServer } from 'vite';

/**
 * Geliştirme başlatıcısı: Vite dev sunucusunu açar, gerçek adresini Electron'a
 * `VITE_DEV_SERVER_URL` ile geçirir ve iki süreci birlikte kapatır.
 * Sabit port beklemek yerine sunucunun bildirdiği adres kullanıldığı için
 * port çakışmalarında da sorunsuz çalışır.
 */
const server = await createServer();
await server.listen();

const url = server.resolvedUrls?.local?.[0];
if (!url) {
  await server.close();
  throw new Error('Vite geliştirme sunucusunun adresi alınamadı.');
}

server.printUrls();

// Ek argümanlar Electron'a geçirilir: `npm run electron:dev -- --disable-gpu`
const electron = spawn(electronPath, ['.', ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: { ...process.env, VITE_DEV_SERVER_URL: url },
});

let isClosing = false;
const shutdown = async (code) => {
  if (isClosing) return;
  isClosing = true;
  await server.close();
  process.exit(code);
};

electron.on('close', (code) => shutdown(code ?? 0));
electron.on('error', async (error) => {
  console.error(error);
  await shutdown(1);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => electron.kill(signal));
}

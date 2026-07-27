'use strict';

const { contextBridge } = require('electron');

/**
 * Arayüz yalıtılmış bir bağlamda çalıştığı için Node API'leri sayfaya sızmaz.
 * Buradan yalnızca salt okunur, IPC içermeyen küçük bir masaüstü bilgisi açılır;
 * mevcut web arayüzü bunu kullanmasa da tarayıcı/masaüstü ayrımı gerektiğinde hazırdır.
 */
contextBridge.exposeInMainWorld('cenanDesktop', {
  isDesktop: true,
  platform: process.platform,
  versions: {
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  },
});

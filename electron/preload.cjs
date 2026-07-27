const { contextBridge } = require('electron')

// Sandbox açıkken preload CommonJS olmak zorundadır; bu yüzden dosya .cjs uzantılıdır.
contextBridge.exposeInMainWorld('cenan', {
  isElectron: true,
  platform: process.platform,
  versions: {
    app: process.env.npm_package_version ?? '',
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  },
})

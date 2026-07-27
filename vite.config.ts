import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Electron paketlenmiş uygulamayı file:// üzerinden yükler; göreli taban şart.
  base: './',
  plugins: [react()],
})

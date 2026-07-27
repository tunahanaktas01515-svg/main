import { spawn } from 'node:child_process'
import process from 'node:process'
import electronPath from 'electron'
import { createServer } from 'vite'

// Vite'i JS API ile başlatıp adresini Electron'a aktarır; böylece dev akışı
// Windows/macOS/Linux'ta ek bağımlılık (cross-env vb.) olmadan aynı çalışır.
const server = await createServer()
await server.listen()
server.printUrls()

const url = server.resolvedUrls?.local?.[0] ?? `http://localhost:${server.config.server.port}`

const child = spawn(electronPath, ['.'], {
  stdio: 'inherit',
  env: { ...process.env, VITE_DEV_SERVER_URL: url },
})

child.on('close', async (code) => {
  await server.close()
  process.exit(code ?? 0)
})

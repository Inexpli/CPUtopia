import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // zeby sciezka do zdjec byla naturalna
  // server: {
  // proxy: {
  //   '/uploads': {
  //     target: 'http://localhost:8080',
  //     changeOrigin: true,
  //     configure: (proxy) => {
  //       proxy.on('proxyReq', (_proxyReq, req) => {
  //         console.log('Proxying request to backend:', req.url)
  //       })
  //       proxy.on('error', (err, _req, res) => {
  //         console.error('Proxy error:', err)
  //         if (!res.headersSent) {
  //           res.writeHead(500, {
  //             'Content-Type': 'text/plain',
  //           })
  //         }
  //         res.end('Proxy error: ' + err.message)
  //       })
  //     }
  //   }
  // }
  // }
})

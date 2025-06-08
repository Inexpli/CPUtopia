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
  server: {
  proxy: {
    '/uploads': {
      target: 'http://nginx',
      changeOrigin: true,
      configure: (proxy, options) => {
        proxy.on('proxyReq', (proxyReq, req, res) => {
          console.log('Proxying request to backend:', req.url)
        })
        proxy.on('error', (err, req, res) => {
          console.error('Proxy error:', err)
          if (!res.headersSent) {
            res.writeHead(500, {
              'Content-Type': 'text/plain',
            })
          }
          res.end('Proxy error: ' + err.message)
        })
      }
    }
  }
  }
})

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/uae/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'redirect-root-to-uae',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/' || req.url === '') {
            res.writeHead(302, { Location: '/uae/' })
            res.end()
            return
          }
          next()
        })
      },
    },
  ],
  server: {
    host: true,
    port: 5174,
    proxy: {
      '/uae-api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uae-api/, '/api'),
      },
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
})

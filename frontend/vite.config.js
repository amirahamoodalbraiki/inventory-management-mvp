import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth/login': { 
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/products': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/stock-changes': { 
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/users': { 
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})

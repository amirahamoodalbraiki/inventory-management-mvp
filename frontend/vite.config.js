import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth/login': { 
        target: process.env.VITE_BACKEND_URL,
        changeOrigin: true,
      },
      '/products': {
        target: process.env.VITE_BACKEND_URL,
        changeOrigin: true,
      },
      '/stock-changes': { 
        target: process.env.VITE_BACKEND_URL,
        changeOrigin: true,
      },
      '/users': { 
        target: process.env.VITE_BACKEND_URL,
        changeOrigin: true,
      },
      '/notifications': { 
        target: process.env.VITE_BACKEND_URL,
        changeOrigin: true,
      },
    },
  },
})

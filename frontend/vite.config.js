import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth/login': { 
        target: 'https://inventory-management-mvp.onrender.com',
        changeOrigin: true,
      },
      '/products': {
        target: 'https://inventory-management-mvp.onrender.com',
        changeOrigin: true,
      },
      '/stock-changes': { 
        target: 'https://inventory-management-mvp.onrender.com',
        changeOrigin: true,
      },
      '/users': { 
        target: 'https://inventory-management-mvp.onrender.com',
        changeOrigin: true,
      },
    },
  },
})

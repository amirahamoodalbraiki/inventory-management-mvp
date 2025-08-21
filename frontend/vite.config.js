import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: mode === 'development' ? {
    proxy: {
      '/auth/login': { 
        target: process.env.VITE_API_BASE || 'http://localhost:8080',
        changeOrigin: true,
      },
      '/products': {
        target: process.env.VITE_API_BASE || 'http://localhost:8080',
        changeOrigin: true,
      },
      '/stock-changes': { 
        target: process.env.VITE_API_BASE || 'http://localhost:8080',
        changeOrigin: true,
      },
      '/users': { 
        target: process.env.VITE_API_BASE || 'http://localhost:8080',
        changeOrigin: true,
      },
      '/notifications': { 
        target: process.env.VITE_API_BASE || 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  } : {},
  build: {
    sourcemap: mode === 'development',
    outDir: 'dist',
    minify: mode === 'production',
  }
}))

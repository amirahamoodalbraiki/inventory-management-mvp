import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: mode === 'development' ? {
    proxy: {
      '/auth/login': { 
        target:'http://localhost:8080',
        changeOrigin: true,
      },
      '/products': {
        target:'http://localhost:8080',
        changeOrigin: true,
      },
      '/images': {
        target:'http://localhost:8080',
        changeOrigin: true,
      },
      '/stock-changes': { 
        target:'http://localhost:8080',
        changeOrigin: true,
      },
      '/users': { 
        target:'http://localhost:8080',
        changeOrigin: true,
      },
      '/notifications': { 
        target:'http://localhost:8080',
        changeOrigin: true,
      },
    },
  } : {},
  build: {
    sourcemap: mode === 'development',
    sourcemap: mode === 'development',
    outDir: 'dist',
    minify: mode === 'production',
  }
}))
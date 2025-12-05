import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://4e99a5f36a75.ngrok-free.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})


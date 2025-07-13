import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // String shorthand: http://localhost:5173/api -> http://localhost:5000/api
      '/api': {
        // Replace 5000 with your actual backend server port
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
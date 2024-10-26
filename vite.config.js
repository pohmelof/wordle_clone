import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/wordle_clone",
  plugins: [react()],
  test: {
    enviroment: 'jsdom',
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/terminal-portfolio/',  // 👈 must match your repo name exactly
})
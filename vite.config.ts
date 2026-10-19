import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Production builds are served from the GitHub Pages project URL
// https://ziahgg.github.io/ZiahBuild/, so assets are emitted under /ZiahBuild/.
// The dev server keeps serving from / (http://localhost:5173/).
// If you later switch to a custom domain, change the build base to '/'.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/ZiahBuild/' : '/',
  plugins: [react(), tailwindcss()],
}))

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import imageSizes from './vite.image-sizes.js'

export default defineConfig({
  plugins: [react(), imageSizes()],
})

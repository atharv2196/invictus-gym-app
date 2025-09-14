import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// [https://vitejs.dev/config/](https://vitejs.dev/config/)
export default defineConfig({
  plugins: [react()],
  
  // IMPORTANT: The name here MUST match your GitHub repository name exactly.
  base: '/', 
})

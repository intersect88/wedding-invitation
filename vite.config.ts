import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // When using a custom domain (CNAME) the site is served at the root.
  // Use root base so asset paths don't include the repository name.
  base: '/',
})

import { defineConfig } from 'vite';
export default defineConfig({
  base: './',
  build: { rollupOptions: { input: ['index.html', 'privacy.html', 'terms.html', 'delete-account.html'] } }
});

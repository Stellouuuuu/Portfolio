import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Relative base: the built site works from any folder (GitHub Pages project page, a custom domain, a local preview).
export default defineConfig({
  base: './',
  plugins: [react()],
  test: { environment: 'jsdom' },
});

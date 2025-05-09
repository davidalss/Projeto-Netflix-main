import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './', // Garante que os caminhos relativos funcionem
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        principal: resolve(__dirname, 'principal.html'),
      },
    },
  },
});

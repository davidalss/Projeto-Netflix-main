import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/', // Use '/' para garantir que os caminhos sejam resolvidos corretamente no Vercel
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        principal: resolve(__dirname, 'principal.html'),
      },
    },
  },
});

import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['stream', 'http', 'https', 'zlib'],
    }),
  ],
  envPrefix: 'CTP_',
  resolve: {
    alias: {
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      '@core': resolve(__dirname, './src/core/'),
      '@pages': resolve(__dirname, './src/pages/'),
      '@components': resolve(__dirname, './src/components/'),
      '@models': resolve(__dirname, './src/models/'),
      '@enums': resolve(__dirname, './src/enums/'),
      '@constants': resolve(__dirname, './src/constants/'),
      '@utils': resolve(__dirname, './src/utils/'),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
});

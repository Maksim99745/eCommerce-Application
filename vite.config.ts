import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@core',
        replacement: resolve(__dirname, './src/core/'),
      },
      {
        find: '@pages',
        replacement: resolve(__dirname, './src/pages/'),
      },
      {
        find: '@components',
        replacement: resolve(__dirname, './src/components/'),
      },
      {
        find: '@models',
        replacement: resolve(__dirname, './src/models/'),
      },
      {
        find: '@enums',
        replacement: resolve(__dirname, './src/enums/'),
      },
      {
        find: '@constants',
        replacement: resolve(__dirname, './src/constants/'),
      },
      {
        find: '@utils',
        replacement: resolve(__dirname, './src/utils/'),
      },
    ],
  },
});

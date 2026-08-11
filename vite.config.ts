import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  root: 'demo',
  plugins: [
    vue(),
    dts({
      root: import.meta.dirname,
      bundleTypes: true,
      outDirs: resolve(import.meta.dirname, 'dist'),
      entryRoot: resolve(import.meta.dirname, 'src'),
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    outDir: resolve(import.meta.dirname, 'dist'),
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'VueBackgroundStars',
      formats: ['es', 'umd'],
      fileName: (format) => `vue-background-stars.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
        assetFileNames: () => 'vue-background-stars.css',
      },
    },
    cssCodeSplit: false,
    cssMinify: true,
    sourcemap: true,
  },
});

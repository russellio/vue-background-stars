import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  root: 'demo',
  plugins: [
    vue(),
    dts({
      root: __dirname,
      bundleTypes: true,
      outDirs: resolve(__dirname, 'dist'),
      entryRoot: resolve(__dirname, 'src'),
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
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

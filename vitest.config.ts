import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './tests/setup.ts',

    // 👇 ici on mock tous les imports .css
    alias: {
      '\\.css$': path.resolve(__dirname, 'tests/__mocks__/styleMock.js'),
    },
    deps: {
      inline: ['vuetify'], // important pour compiler Vuetify correctement
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './'),
    },
  },
})

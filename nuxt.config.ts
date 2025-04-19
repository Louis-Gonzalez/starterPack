export default defineNuxtConfig({
  modules: ['@nuxt/test-utils', '@nuxt/eslint', '@pinia/nuxt'],
  compatibilityDate: '2024-11-01',
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.min.css'],

  vite: {
    define: { 'process.env.DEBUG': false },
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `@use "vuetify/styles" as *;`,
        },
      },
    },
  },

  build: {
    transpile: ['vuetify'],
  },
});

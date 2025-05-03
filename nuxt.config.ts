import svgLoader from './vite/plugins/svgLoader';
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxtjs/i18n', 'nuxt-svgo'],
  i18n: {
    lazy: true,
    langDir: 'locales/',
    strategy: 'no_prefix',
    skipSettingLocaleOnNavigate: false,
    locales: [
      {
        code: 'fr-FR',
        iso: 'fr-FR',
        name: 'French',
        file: 'fr-FR.json',
      },
      {
        code: 'de-DE',
        iso: 'de-DE',
        name: 'German',
        file: 'de-DE.json',
      },
      {
        code: 'en-GB',
        iso: 'en-GB',
        name: 'English',
        file: 'en-GB.json',
      },
      {
        code: 'es-ES',
        iso: 'es-ES',
        name: 'Spanish',
        file: 'es-ES.json',
      },
    ],
    defaultLocale: 'en-GB',
    detectBrowserLanguage: {
      useCookie: true, // pour utiliser la langue du navigateur (false)
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    vueI18n: './i18n.config.js',
    experimental: {
      bundle: {
        optimizeTranslationDirective: false
      }
    },
  },
  compatibilityDate: '2024-11-01',
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
    '@/assets/css/main.css',
  ],
  vite: {
    define: { 'process.env.DEBUG': false },
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `@use "vuetify/styles" as *;`,
        },
      },
    },
    plugins: [svgLoader()],
  },
  build: {
    transpile: ['vuetify'],
  },
});

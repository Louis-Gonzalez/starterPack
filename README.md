# This is a starter pack for a nuxt js project

In this starter pack, you'll find the vuetify dependency, a test dependency, a linter, a store, a middleware and internationalization (i18n).

If you're curious, you'll also find the “npm” commands.

## This command npm

### for vuetify :

npm i -D vuetify vite-plugin-vuetify
npm i @mdi/font

### for test units :

npx nuxi@latest module add test-utils

the command to run the linter is : `npx vitest` in your terminal

### for ESLint :

npx nuxi@latest module add eslint

the command to run the linter is : `npm run lint .` in your terminal

### for Prettier :

npm install --save-dev prettier

the command to run the linter is : `npx prettier --write .` ou `npm run format` in your terminal

### for Pinia Store :

npm i pinia @pinia/nuxt

Thanks to pinia, I've done an authentication on an api that returns a token and a set of user data. (https://dummyjson.com)
I've integrated it into the navigation bar for behavior.

### Middleware :

Middleware has been added for user, admin and set globally

### for I18N :

npx nuxi@latest module add i18n

link to dependence: (https://nuxt.com/modules?q=i18n) and link to documentation (https://i18n.nuxtjs.org/docs/guide/lang-switcher)

### for SVG :

npx nuxi@latest module add nuxt-svgo
npm install -D vite-svg-loader

**SVGO** and **vite-svg-loader** work together to optimize and import SVG files as Vue components.  
This allows you to use SVGs (monochrome or multicolor) directly in your templates without relying on `<img>` tags.

```vue
<script setup>
import MyIcon from '~/assets/icons/my-icon.svg';
</script>

<template>
  <MyIcon />
</template>
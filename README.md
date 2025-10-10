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

### Special Script: check-i18n

My check-i18n script is designed to keep translation files functional and make multilingual application development easier. 
During merges, conflicts are common, and this tool will hopefully help you a lot.

✅ Interactive correction of incorrect lines
✅ Detection and manual handling of duplicate keys (even multiple ones)
✅ Sorting of keys
✅ Implicit removal of empty lines
✅ Report of missing keys between files

Command to run the script: `npm run check-i18n`

### for SVG :

`npx nuxi@latest module add nuxt-svgo`
`npm install -D vite-svg-loader`

**SVGO** and **vite-svg-loader** work together to optimize and import SVG files as Vue components.  
This allows you to use SVGs (monochrome or multicolor) directly in your templates without relying on `<img>` tags.

```vue
<script setup>
import MyIcon from '~/assets/icons/my-icon.svg';
</script>

<template>
  <MyIcon />
</template>
```

---

## 🎨 Font Integration (Material Design Icons + Font Awesome)

To use **both Material Design Icons (MDI)** and **Font Awesome (FA)** within your Vuetify configuration, install the following dependencies:

### 🧩 Installation Commands

# Font Awesome (Free)
`npm install @fortawesome/fontawesome-svg-core @fortawesome/vue-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons -D`


# Material Design Icons
`npm install material-design-icons-iconfont -D`

---

### ⚙️ Add Configuration in the Vuetify Plugin

Add this to your `plugins/vuetify.ts` (or `plugins/vuetify.js`):

```ts
// plugins/vuetify.ts
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { fa } from 'vuetify/iconsets/fa4' // pour compatibilité Vuetify 3

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#E53935',
            secondary: '#FFCDD2',
            success: '#4CAF50',
            info: '#2196F3',
            warning: '#FB8C00',
            error: '#FF5252',
            color1: '#9C27B0',
            color2: '#FFEB3B',
            color3: '#121212',
          },
        },
        dark: {
          colors: {
            primary: '#FFCDD2',
            secondary: '#E53935',
            success: '#81C784',
            info: '#64B5F6',
            warning: '#FFB74D',
            error: '#E57373',
            color1: '#CE93D8',
            color2: '#FFF176',
            color3: '#868686',
            background: '#121212',
            text: '#FFFFFF',
          },
        },
      },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
        fa,
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})

```

💡 *This configuration enables both MDI and Font Awesome icons globally.*

---

### 🧱 Example of Usage

You can now use both icon sets directly in your templates:

```vue
<template>
  <section class="pa-4">
    <h2>Icon examples</h2>
    <p>
      <!-- Material Design Icon -->
      <v-icon icon="mdi-home" />

      <!-- Font Awesome Solid -->
      <v-icon icon="fa:fa-solid fa-user" />

      <!-- Font Awesome Regular -->
      <v-icon icon="fa:fa-regular fa-square-check" />

      <!-- Font Awesome Brand -->
      <v-icon icon="fa:fa-brands fa-github" />
    </p>
  </section>
</template>
```

---

### 🎨 Icon Styling and Colors

Vuetify allows you to style icons directly using the `color` prop.

```vue
<v-icon icon="fa:fa-solid fa-user" color="primary" />
<v-icon icon="mdi:mdi-home" color="deep-purple" />
```

You can also use dynamic colors with Vue’s reactivity system (e.g., using a `ref` variable).

---

✅ **Summary:**
- `mdi-` icons are available by default.
- `fa:` prefix allows access to Font Awesome icons.
- The `color` prop works for both MDI and FA icons.

---

📄 *End of README*

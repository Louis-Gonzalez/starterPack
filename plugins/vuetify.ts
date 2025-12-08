// plugins/vuetify.ts
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { fa } from 'vuetify/iconsets/fa4'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { h } from 'vue'

library.add(fas, far)

const iconFiles = import.meta.glob('@/assets/icons/custom/*.svg', { as: 'raw', eager: true })
const customIcons: Record<string, string> = {}
for (const path in iconFiles) {
  const name = path.split('/').pop()?.replace('.svg', '')
  if (name) customIcons[name] = iconFiles[path]
}

const custom = {
  component: (props: any) => {
    const icon = customIcons[props.icon]
    if (!icon) return h('div', { class: 'd-inline-block' }, 'Icon not found')
    return h('div', {
      innerHTML: icon,
      style: { display: 'inline-block', width: '24px', height: '24px' },
    })
  },
}

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
      aliases: {
        ...aliases,
        ...Object.keys(customIcons).reduce((acc, name) => {
          acc[`custom:${name}`] = name
          return acc
        }, {} as Record<string, string>),
      },
      sets: {
        mdi,
        fa,
        custom,
      },
    },
  })
  nuxtApp.vueApp.use(vuetify)
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})

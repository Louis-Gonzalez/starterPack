import { watch } from 'vue'
import type { ThemeInstance } from 'vuetify'

export default defineNuxtPlugin((nuxtApp) => {
  const theme = nuxtApp.vueApp._context.provides.theme as ThemeInstance

  if (!theme) {
    console.warn('[Theme Sync] Vuetify theme not found.')
    return
  }

  const updateHtmlClass = () => {
    const html = document.documentElement
    if (theme.global.current.value.dark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  nuxtApp.hook('app:mounted', () => {
    updateHtmlClass()
  })

  watch(theme.global.name, () => {
    updateHtmlClass()
  })
})




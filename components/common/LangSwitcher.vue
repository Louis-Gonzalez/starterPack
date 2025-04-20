<script setup>
import { useCookie } from '#app'

defineProps({
  themeClass: String
})

const { locale, locales, setLocale } = useI18n()
const userLanguage = useCookie('i18n', {
  maxAge: 10 * 60 * 60 * 30,
})

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

async function changeLocale(newLocale) {
  await setLocale(newLocale)
  userLanguage.value = newLocale
}
</script>

<template :class="themeClass">
  <button
    class="ma-1 pa-1"
    v-for="loc in availableLocales"
    :key="loc.code"
    @click="changeLocale(loc.code)"
  >
    {{ loc.name }}
  </button>
</template>

<style scoped>
.dark-theme button {
  border-radius: 0.5rem;
  background-color: #333;
  color: white;
  border: 1px solid var(--color-success);
}
.light-theme button {
  border-radius: 0.5rem;
  background-color: #fff;
  color: black;
  border: 1px solid var(--color-success);
}
</style>

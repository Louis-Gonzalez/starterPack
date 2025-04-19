<script setup>
import { useCookie } from '#app'

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

<template>
  <button
    v-for="loc in availableLocales"
    :key="loc.code"
    @click="changeLocale(loc.code)"
  >
    {{ loc.name }}
  </button>
</template>

<style scoped>
button {
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}
</style>

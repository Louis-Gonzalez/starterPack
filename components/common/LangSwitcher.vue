<script setup>
import { useCookie } from '#app';

defineProps({
  themeClass: String,
});

const { locale, locales, setLocale } = useI18n();
const userLanguage = useCookie('i18n', {
  maxAge: 10 * 60 * 60 * 30,
});

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

async function changeLocale(newLocale) {
  await setLocale(newLocale);
  userLanguage.value = newLocale;
}
</script>

<template>
  <div class="lang-switcher">
    <button
      v-for="locale in availableLocales"
      :key="locale.code"
      @click="setLocale(locale.code)"
      :class="['lang-btn', { active: locale.code === currentLocale }]"
    >
      {{ locale.name }}
    </button>
  </div>
</template>

<style scoped>
.lang-switcher {
  display: flex;
  gap: 0.5rem;
}

.lang-btn {
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  border: 1px solid var(--main-success);
  transition:
    background-color 0.3s,
    color 0.3s;
}

.dark-theme .lang-btn {
  background-color: #333;
  color: white;
}

.light-theme .lang-btn {
  background-color: #fff;
  color: black;
}

.lang-btn.active {
  background-color: var(--main-success);
  color: white;
}
</style>

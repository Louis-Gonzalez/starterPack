<script setup lang="ts">
import Navbar from '~/components/common/Navbar.vue';
import { onMounted, watchEffect } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();

onMounted(() => {
  watchEffect(() => {
    const htmlEl = document.documentElement;
    const isDark = theme.global.name.value === 'dark';

    if (isDark) {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }
  });
});
</script>

<template>
  <div>
    <NuxtLayout>
      <Navbar />
        <NuxtLoadingIndicator />
      <NuxtPage />

      <Notivue v-slot="item">
        <NotivueSwipe :item="item">
          <Notification :item="item" />
        </NotivueSwipe>
      </Notivue>
    </NuxtLayout>
  </div>
</template>

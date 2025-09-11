<script setup lang="ts">
import {
  lightTheme,
  pastelTheme,
  materialTheme,
  darkTheme,
  slateTheme
} from 'notivue'
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
          <Notification :item="item" :theme="pastelTheme" />
        </NotivueSwipe>
      </Notivue>
    </NuxtLayout>
  </div>
</template>

<style>
:root {
  /* Your variables */
  --header-height: 95px;
  --container-padding: 10px;

  /* Add the top padding and place it below the header */
  --nv-root-top: calc(var(--header-height) + var(--container-padding));

  /* Add the same left-right paddings of your app container */
  --nv-root-left: var(--container-padding);
  --nv-root-right: var(--container-padding);
}

</style>


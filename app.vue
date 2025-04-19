<script setup lang="ts">
import Navbar from '~/components/common/Navbar.vue';
</script>

<template>
  <div>
    <NuxtLayout>
      <Navbar />
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>


<script setup lang="ts">

  const userStore = useUserStore();
  const token = userStore.token;
  const user = userStore.user;

</script>

<template>
  <h1>Profile Page</h1>
  <h2>Profile Informations</h2>
  <p>
    {{token}}
    {{ user }}
  </p>
</template>

<style scoped>

</style>
<script setup lang="ts">
const userStore = useUserStore();
const token = userStore.token;
const user = userStore.user;
</script>

<template>
  <section>
    <h1>Profile Page</h1>
    <h2>Profile Informations</h2>
    <p>
      {{ token }}
    </p>
    <span></span>
    <p>
      {{ user }}
    </p>
  </section>


  <section>
    <button @click="push.success('Hello from your first notification!')">
      Push notification
    </button>
  </section>
</template>

<style scoped></style>

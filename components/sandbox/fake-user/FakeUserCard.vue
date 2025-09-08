
<script setup lang="ts">
  const props = defineProps<{ user: { name: string, email: string } }>()
</script>

<template>
  <v-card class="d-flex justify-center align-center mx-10 pa-2 ga-2">
    <h3>{{props.user.name }}</h3>
    <p>{{ props.user.email }}</p>
  </v-card>
</template>



<script setup lang="ts">
  const props = defineProps<{ data: { name: string, email: string } }>()
</script>

<template>
  <v-card class="d-flex justify-center align-center mx-10 pa-2 ga-2">
    <h3>{{props.data.name }}</h3>
    <p>{{ props.data.email }}</p>
  </v-card>
</template>


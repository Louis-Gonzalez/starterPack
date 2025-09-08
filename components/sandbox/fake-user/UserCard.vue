
<script setup lang="ts">
  const props = defineProps<{ user: { name: string, email: string } }>()
</script>

<template>
  <div class="border p-4 rounded">
    <h3>{{props.user.name }}</h3>
    <p>{{ props.user.email }}</p>
  </div>
</template>


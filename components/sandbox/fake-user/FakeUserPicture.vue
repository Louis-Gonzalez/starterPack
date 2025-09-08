<script setup lang="ts">
  const props = defineProps<{ user: { name: string, picture: string } }>()
</script>

<template>
  <div class="d-flex justify-center align-center ma-3 pa-2 ga-2">
    <img :src="props.user.picture" :alt="props.user.name" class="rounded-full img-class" />
  </div>
</template>

<style scoped>
.img-class {
  width: 15rem;
  height: 15rem;
}
</style>



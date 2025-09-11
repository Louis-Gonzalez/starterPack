<script setup lang="ts">
  const props = defineProps<{ data: { name: string, picture: string } }>()
</script>

<template>
  <div class="d-flex justify-center align-center ma-3 pa-2 ga-2">
    <img :src="props.data.picture" :alt="props.data.name" class="rounded-full img-class" />
  </div>
</template>

<style scoped>
.img-class {
  width: 15rem;
  height: 15rem;
}
</style>



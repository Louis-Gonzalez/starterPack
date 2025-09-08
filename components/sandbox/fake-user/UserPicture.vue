<script setup lang="ts">
  const props = defineProps<{ user: { name: string, picture: string } }>()
</script>

<template>
  <img :src="props.user.picture" :alt="props.user.name" class="rounded-full img-class" />
</template>

<style scoped>
.img-class {
  width: 1.5rem;
  height: 1.5rem;
}
</style>



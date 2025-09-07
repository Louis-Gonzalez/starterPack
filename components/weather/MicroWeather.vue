<script setup lang="ts">
  import type { IMicroWeather } from '~/types';
  const props = defineProps({
    item: IMicroWeather
  })
</script>

<template>
  <v-card border class="mt-2 ma-2 pa-4 mini-card">
<!--    <div v-for="(value, key) in city.caracteristic" :key="key" class="d-flex align-center mb-2">-->
<!--      <img v-if="icons[key]" :src="icons[key]" alt="" class="icon-class mr-2"/>-->
<!--      <span>{{ t(getLabel(key)) }} : {{ value }}{{ units[key] || '' }}</span>-->
<!--    </div>-->
    inside the card for information
  </v-card>
</template>

<style scoped>

</style>
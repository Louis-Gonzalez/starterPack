<script setup lang="ts">
  import type { IMicroWeather } from '~/types';

  const props = defineProps<{
    item: IMicroWeather
  }>()

  const itemUnit = computed(() => props.item.itemUnit ?? "")
</script>

<template>
  <v-card border class="mt-2 ma-2 pa-4 mini-card">
    <div class="d-flex align-center ma-2 pa-2">
      <img v-if="props.item.srcIcon" :src="props.item.srcIcon" :alt="props.item.alt">
      <div class="ma-2 pa-2">
        <p>{{ props.item.itemName}} :</p>
        <p>{{ props.item.itemValue }} {{itemUnit}}</p>
      </div>
    </div>
  </v-card>
</template>

<style scoped></style>
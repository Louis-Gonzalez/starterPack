<script setup lang="ts">
import type { IMicroWeather } from '~/types';
import { computed } from 'vue';

const props = defineProps<{
  item: IMicroWeather
}>()

const itemUnit = computed(() => props.item.itemUnit ?? "")
</script>

<template>
  <div class="mt-2 ma-2 pa-2 mini-card">
    <div class="d-flex align-center">
      <!-- Icône à gauche -->
      <img v-if="props.item.srcIcon" :src="props.item.srcIcon" :alt="props.item.alt" class="svg-class mr-2">

      <!-- Texte à droite -->
      <div class="d-flex flex-column justify-center">
        <p class="item-name"><strong>{{ props.item.itemName }}</strong></p>
        <p class="item-value">{{ props.item.itemValue }} {{ itemUnit }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.svg-class {
  width: 2rem;
  height: 2rem;
}

.mini-card {
  width: 8rem;
  height: auto;
  padding: 0.5rem;
}

.item-name {
  margin: 0;
  font-size: 0.9rem;
}

.item-value {
  margin: 0;
  font-size: 0.85rem;
  color: #555;
}
</style>

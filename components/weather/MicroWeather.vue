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
    <div class="d-flex align-center ma-2">
      <img v-if="props.item.srcIcon" :src="props.item.srcIcon" :alt="props.item.alt" class="svg-class mr-2">
      <p class="item-name"><strong>{{ props.item.itemName }}</strong></p>
      <p class="ml-2">
        <span class="d-flex ga-2">
          {{ props.item.itemValue }} {{ itemUnit }}
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.svg-class {
  width: 2rem;
  height: 2rem;
}

.mini-card {
  width: auto;
  height: auto;
}
</style>

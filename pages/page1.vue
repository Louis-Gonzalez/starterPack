<script setup lang="ts">
import { ref } from 'vue'

const titlePage1 = ref('Page 1')
const overlayOpen = ref(false) // <-- même nom que dans le v-model

const toggleOverlay = () => {
  overlayOpen.value = !overlayOpen.value
}
</script>

<template>
  <div>
    <h1>{{ titlePage1 }}</h1>
    <v-btn color="primary" @click="toggleOverlay">
      Toggle v-overlay
    </v-btn>
  </div>

  <VOverlay v-model:isOpen="overlayOpen" title="Mon overlay" nb="5" />
</template>

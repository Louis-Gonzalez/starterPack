<script setup>
import { ref } from 'vue'

const pageTitle = ref('Homepage')
const isTextVisible = ref(false)

const toggleText = () => {
  isTextVisible.value = !isTextVisible.value
}
</script>

<template>
  <h1>{{ pageTitle }}</h1>

  <v-btn
    color="primary"
    class="px-2"
    outlined
    @click="toggleText"
  >
    Click Me
  </v-btn>

  <p v-if="isTextVisible">This is a text ! or not ! </p>
</template>


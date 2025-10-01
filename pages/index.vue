<script setup>
import { ref } from 'vue'
const pageTitle = ref('Homepage')
</script>

<template>
  <h1>{{ pageTitle }}</h1>
  <v-btn
    color="primary"
    class="px-2"
    outlined
    >
    Click Me
  </v-btn>
</template>



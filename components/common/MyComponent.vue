<script setup lang="ts">
  import { ref } from 'vue'
  const paragraphTitle = ref('This is a paragraph title');
  const props = defineProps({
    myComponentProps: String
  })
</script>

<template>
  <div>
    <h2>{{paragraphTitle}}</h2>
    <p>{{props.myComponentProps}}</p>
  </div>
</template>

<style scoped></style>
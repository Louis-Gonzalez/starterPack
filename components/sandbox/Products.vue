<script setup lang="ts">
  import { ref } from 'vue'
  import type { IProduct } from '~/types';

  const myProduct = ref<IProduct>();
</script>

<template>
  <div>
    <h1>My product is :</h1>
    <p>{{myProduct}}</p>
  </div>
</template>

<style scoped>

</style>
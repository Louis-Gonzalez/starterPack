<script setup lang="ts">
/// counter composable
const { count, increment, decrement, reset } = useCounter(5);
</script>

<template>
  <section id="counter-composable">
    <div class="p-4">
      <h1>Counter Section</h1>
      <p>Current value : {{ count }}</p>

      <div class="d-flex align-center ma-1 pa-2 ga-2">
        <v-btn @click="increment">➕ 1</v-btn>
        <v-btn @click="decrement">➖ 1</v-btn>
        <v-btn @click="reset">🔄 Reset</v-btn>
      </div>
    </div>
  </section>
</template>

<style scoped></style>

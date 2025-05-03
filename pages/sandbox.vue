<script setup lang="ts">
import OverlayComponent from '~/components/sandbox/OverlayComponent.vue';

const number = ref(14)
const isOpen = ref(false)
const openModal = () =>{
console.log("je suis dans l'open")
isOpen.value = true
console.log(isOpen.value);
}

const closeModal = () => {
isOpen.value = false
}
</script>

<template>
  <section>
    <v-btn @click="openModal">Open it</v-btn>
    <OverlayComponent title="Ma modale drawer" :is-open="isOpen" :nb="number" @cancel="closeModal"/>
  </section>
</template>


<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  isOpen: boolean;
  title?: string
  nb?: number
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
}>()

const isOpen = computed({
  get: () => props.isOpen,
  set: (value: boolean) => emit('update:isOpen', value)
})

const close = () => {
  isOpen.value = false
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') close()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <v-overlay
    v-model="isOpen"
    scrim="transparent"
    class="custom-overlay"
  >
    <v-sheet class="drawer-content">
      <div class="title-modal">
        <h3>{{ title ?? 'Titre manquant' }}</h3>
        <div class="nb">{{ nb }}</div>
        <v-btn class="btn-close" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <slot>Contenu par défaut</slot>
    </v-sheet>
  </v-overlay>
</template>

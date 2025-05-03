<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  title: String,
  isOpen: Boolean,
  nb: Number,
})
const emit = defineEmits(['cancel'])

const localOpen = ref(props.isOpen ?? false)

watch(() => props.isOpen, (val) => {
  if (localOpen.value !== val) {
    localOpen.value = val
  }
})

watch(localOpen, (val) => {
  if (!val && props.isOpen) {
    emit('cancel')
  }
})

const close = () => {
  localOpen.value = false
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
  }
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
    v-model="localOpen"
    scrim="transparent"
    class="custom-overlay"
  >
    <v-sheet class="drawer-content">
      <div class="title-modal">
        <h3>{{ props.title ?? 'Titre manquant' }}</h3>
        <div class="nb">{{ props.nb }}</div>
        <v-btn class="btn-close" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div>
        <slot>Contenu par défaut</slot>
      </div>
    </v-sheet>
  </v-overlay>
</template>

<style scoped>
.btn-close {
  width: 1rem !important;
  height: 1rem !important;
  min-width: 1rem !important;
  padding: 0 !important;
  background: var(--main-error);
}

.custom-overlay {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1rem;
}

.drawer-content {
  max-width: 28rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  margin-top: 2rem;
}

.title-modal {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: darkgrey;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.nb {
  background: var(--main-info);
  color: white;
  border-radius: 0.5rem;
  padding: 0 0.5rem;
}
</style>

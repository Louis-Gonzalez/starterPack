<script setup lang="ts">
import type { NotivueItem } from 'notivue'

// props : l'item Notivue à afficher
defineProps<{
  item: NotivueItem
}>()
</script>

<template>
  <v-alert
    border="start"
    elevation="2"
    type="info"
    class="nv-special"
    prominent
  >
    <div class="d-flex flex-column gap-2">
      <div class="text-h6">{{ item.title }}</div>
      <div>{{ item.message }}</div>

      <div class="d-flex justify-space-between align-center mt-2">
        <v-btn
          v-if="item.props?.link"
          :href="item.props.link"
          target="_blank"
          rel="noreferrer"
          variant="text"
          color="primary"
        >
          Ouvrir le lien
        </v-btn>

        <v-btn
          variant="text"
          color="secondary"
          @click="item.clear()"
        >
          Fermer
        </v-btn>
      </div>
    </div>
  </v-alert>
</template>

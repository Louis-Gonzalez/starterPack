<script setup lang="ts">
import { ref } from 'vue'

const unit = 40
const selectedTables = ref([])

const tables = [
  { numero: 'A', x: 12, y: 6, status: 'reserved', places: 4 },
  { numero: 'B', x: 2, y: 7, status: 'free', places: 2 },
  { numero: 'C', x: 5, y: 4, status: 'reserved', places: 2 },
  { numero: 'D', x: 8, y: 7, status: 'free', places: 4 },
  { numero: 'E', x: 4, y: 2, status: 'free', places: 2 },
  { numero: 'F', x: 7, y: 9, status: 'reserved', places: 4 },
  { numero: 'G', x: 9, y: 4, status: 'free', places: 2 },
  { numero: 'H', x: 9, y: 10, status: 'reserved', places: 4 },
  { numero: 'I', x: 9, y: 5, status: 'free', places: 2 },
  { numero: 'J', x: 4, y: 3, status: 'reserved', places: 2 },
  { numero: 'K', x: 5, y: 8, status: 'free', places: 4 },
  { numero: 'L', x: 3, y: 1, status: 'free', places: 2 },
  { numero: 'M', x: 8, y: 6, status: 'reserved', places: 4 },
  { numero: 'N', x: 5, y: 7, status: 'free', places: 2 },
  { numero: 'O', x: 1, y: 6, status: 'reserved', places: 2 },
  { numero: 'P', x: 3, y: 7, status: 'free', places: 2 },
  { numero: 'Q', x: 5, y: 2, status: 'free', places: 4 },
  { numero: 'R', x: 8, y: 9, status: 'reserved', places: 4 },
  { numero: 'S', x: 1, y: 4, status: 'free', places: 2 },
  { numero: 'T', x: 6, y: 10, status: 'reserved', places: 4 },
  { numero: 'U', x: 2, y: 5, status: 'free', places: 2 },
  { numero: 'V', x: 9, y: 3, status: 'reserved', places: 2 },
  { numero: 'X', x: 4, y: 8, status: 'free', places: 4 },
  { numero: 'Y', x: 7, y: 1, status: 'reserved', places: 2 },
  { numero: 'Z', x: 12, y: 1, status: 'free', places: 4 }
]

const maxX = Math.max(...tables.map(t => t.x)) + 1
const maxY = Math.max(...tables.map(t => t.y)) + 1

function toggleTable(table) {
  const exists = selectedTables.value.find(t => t.numero === table.numero)
  if (!exists) {
    selectedTables.value.push(table)
  }
}

function removeTable(numero) {
  selectedTables.value = selectedTables.value.filter(t => t.numero !== numero)
}
</script>

<template>
  <section>
    <h2>Restaurant Map</h2>
    <v-row no-gutters>
      <!-- Zone gauche - Plan des tables -->
      <v-col cols="12" md="9" class="plan-container" style="overflow: auto; max-height: 80vh;">
        <v-container
          fluid
          class="position-relative pa-0"
          :style="{ width: `${maxX * unit}px`, height: `${maxY * unit}px` }"
        >
          <!-- Quadrillage -->
          <div
            class="position-absolute top-0 left-0"
            :style="{
              width: '100%',
              height: '100%',
              backgroundImage:
                'linear-gradient(to right, #e0e0e0 1px, transparent 1px), linear-gradient(to bottom, #e0e0e0 1px, transparent 1px)',
              backgroundSize: `${unit}px ${unit}px`,
              zIndex: 1
            }"
          ></div>

          <!-- Tables -->
          <v-card
            v-for="table in tables"
            :key="table.numero"
            class="d-flex align-center justify-center position-absolute elevation-4"
            :class="[
              selectedTables.some(t => t.numero === table.numero)
                ? 'border border-4 border-blue'
                : '',
              table.status === 'free' ? 'text-white' : 'text-black'
            ]"
            :color="table.status === 'free' ? 'success' : undefined"
            :style="{
              width: `${unit}px`,
              height: `${unit}px`,
              left: `${table.x * unit}px`,
              top: `${table.y * unit}px`,
              zIndex: 2,
              cursor: 'pointer'
            }"
            @click="toggleTable(table)"
          >
            {{ table.numero }}
          </v-card>
        </v-container>
      </v-col>

      <!-- Zone droite - Cartes d'infos -->
      <v-col cols="12" md="3" style="min-width: 250px;">
        <div style="max-height: 80vh; overflow-y: auto;" class="pa-2">
          <v-card
            v-for="table in selectedTables"
            :key="'card-' + table.numero"
            class="mb-4 pa-4 position-relative"
            elevation="2"
          >
            <v-btn
              variant="text"
              size="x-small"
              class="close-btn position-absolute top-0 right-0 mt-2 mr-2"
              @click="removeTable(table.numero)"
            >
              <v-icon size="18">mdi-close</v-icon>
            </v-btn>

            <v-card-title>Table {{ table.numero }}</v-card-title>
            <v-card-text>
              <p><strong>Status :</strong> {{ table.status }}</p>
              <p><strong>Places :</strong> {{ table.places }}</p>
              <p><strong>Position :</strong> (x: {{ table.x }}, y: {{ table.y }})</p>
            </v-card-text>
          </v-card>

          <div v-if="selectedTables.length === 0" class="ma-4 pa-4">
            <em>Cliquez sur une table pour voir ses infos.</em>
          </div>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<style scoped>
.border-blue {
  border-color: #1976d2 !important;
}
.close-btn {
  border-radius: 2px !important;
  min-width: 24px;
  height: 24px;
  padding: 0;
}

</style>

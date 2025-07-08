<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" class="d-flex align-center">
        <!-- Ne pas afficher le bouton toggle tant que isReady = false -->
        <v-btn
          v-if="isReady"
          icon
          variant="text"
          @click.stop="drawer = !drawer"
          aria-label="Toggle drawer"
        >
          <v-icon>{{ drawer ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
        </v-btn>

        <v-toolbar-title>My files</v-toolbar-title>

        <div class="d-none d-md-flex">
          <v-btn icon="mdi-magnify" variant="text" />
          <v-btn icon="mdi-filter" variant="text" />
        </div>

        <v-btn icon="mdi-dots-vertical" variant="text" />
      </v-app-bar>

      <!-- drawer affiché seulement si ready -->
      <v-navigation-drawer
        v-if="isReady"
        v-model="drawer"
        location="start"
        temporary
      >
        <v-list :items="items" @click="closeDrawer" />
      </v-navigation-drawer>

      <v-main style="height: 500px">
        <v-card-text>
          The navigation drawer will appear from the bottom on smaller size screens.
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useCookie } from '#app'

const drawerCookie = useCookie('drawer-is-open', {
  default: () => false,
  maxAge: 60 * 60 * 24 * 7,
})

const drawer = computed({
  get: () => drawerCookie.value,
  set: (val) => (drawerCookie.value = val),
})

const isReady = ref(false)
onMounted(() => {
  isReady.value = true
})

const items = [
  { title: 'Foo', value: 'foo' },
  { title: 'Bar', value: 'bar' },
]

function closeDrawer() {
  drawer.value = false
}
</script>

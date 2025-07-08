<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text">
          <template #default>
            <div>
              <!-- Bouton ouvrir (flèche droite) quand drawer fermé -->
              <v-btn
                icon
                v-if="!drawer"
                @click.stop="openDrawer"
                aria-label="Open drawer"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>

              <!-- Bouton fermer (flèche gauche) quand drawer ouvert -->
              <v-btn
                icon
                v-else
                @click.stop="closeDrawer"
                aria-label="Close drawer"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </div>
          </template>
        </v-app-bar-nav-icon>

        <v-toolbar-title>My files</v-toolbar-title>

        <div class="d-none d-md-flex">
          <v-btn icon="mdi-magnify" variant="text" />
          <v-btn icon="mdi-filter" variant="text" />
        </div>

        <v-btn icon="mdi-dots-vertical" variant="text" />
      </v-app-bar>

      <v-navigation-drawer
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
import { computed } from 'vue'
import { useCookie } from '#app'

const drawerCookie = useCookie('drawer-is-open', {
  default: () => false,
  maxAge: 60 * 60 * 24 * 7, // 1 semaine
})

const drawer = computed({
  get: () => drawerCookie.value,
  set: (val) => (drawerCookie.value = val),
})

const items = [
  { title: 'Foo', value: 'foo' },
  { title: 'Bar', value: 'bar' },
]

function openDrawer() {
  drawer.value = true
}

function closeDrawer() {
  drawer.value = false
}
</script>



<script setup lang="ts">
const userStore = useUserStore();
const token = userStore.token;
const user = userStore.user;

///// other notification ////////
import { usePush } from 'notivue'
const push = usePush()

function sendClassic() {
  push.success('Hello from your first notification!')
}

function sendSpecial() {
  push.info({
    title: 'Notification spéciale',
    message: 'Clique pour ouvrir le dossier',
    // n'importe quelles props : ici on met link + flag isSpecial
    props: {
      isSpecial: true,
      link: '/user/user'
    },
    duration: 8000
  })
}
</script>

<template>
  <section>
    <h1>Profile Page</h1>
    <h2>Profile Informations</h2>
    <p>
      {{ token }}
    </p>
    <span></span>
    <p>
      {{ user }}
    </p>
  </section>

  <section>
    <v-btn color="primary" @click="sendClassic">Notif classique</v-btn>
    <v-btn color="secondary" @click="sendSpecial">Notif spéciale avec lien</v-btn>
  </section>
</template>

<style scoped>
.nv-special {
  border-left: 4px solid #3b82f6; /* bleu */
}
</style>

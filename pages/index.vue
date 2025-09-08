<script setup lang="ts">
import Home from './../assets/icons/home.svg';
import Microsoft from './../assets/icons/microsoft.svg';
import { useI18n } from 'vue-i18n';
import FakeUserCard from '~/components/sandbox/fake-user/FakeUserCard.vue';
import FakeUserPicture from '~/components/sandbox/fake-user/FakeUserPicture.vue';

import type { IFakeUser } from '~/types';

const { t } = useI18n()
const colorSvg = [
  'deeppink',
  'darkblue',
  'darkcyan',
  'darkgreen',
  'darkorange',
  'olive',
  'crimson',
  'chartreuse',
  'cornFlowerBlue',
  'gold',
  'magenta',
];

const currentColor = ref(colorSvg[0]);

const changeColor = () => {
  const randomIndex = Math.floor(Math.random() * colorSvg.length);
  currentColor.value = colorSvg[randomIndex];
};

// Dynamic component test with componentMap for script setup lang="ts"
const user:IFakeUser = {
  name: 'Alice',
  email: 'alice@example.com',
  picture: '/fake-user/alice.jpg',
}

const displayMode = ref<'card' | 'picture'>('card')

const componentMap: Record<'card' | 'picture', Component>  = {
  card: FakeUserCard,
  picture: FakeUserPicture
}
</script>

<template>
  <section>
    <h1>{{ t('home') }}</h1>
    <div>
      <h2>Welcome! This is the home page</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quaerat.
        Exercitationem dolorem quo aliquam ratione quia. Harum doloribus atque
        assumenda. Quos aspernatur laudantium quibusdam. Placeat expedita
        excepturi quis id quidem?
      </p>

      <div class="d-flex justify-lg-space-around align-center ma-3">
        <div class="text-center">
          <Home :fill="currentColor" class="home-svg" />
          <v-btn @click="changeColor" class="mt-2">Random Colors</v-btn>
        </div>

        <div class="text-left">
          <article class="mb-2">
            <strong>This is the Microsoft SVG!</strong><br />
            No need to import it as an <code>&lt;img&gt;</code> thanks to the
            <code>vite-svg-loader</code> dependency.
          </article>
          <Microsoft />
        </div>
      </div>
    </div>
  </section>

<!--  dynamic component test -->
  <section>
    <div>
<!--      keep alive it is an option-->
<!--      <keep-alive>-->
<!--      <transition name="fade">-->
        <component :is="componentMap[displayMode]" :user="user" />
<!--      </transition>-->

      <!--      </keep-alive>-->
    </div>
    <div class="d-flex justify-center align-center ma-3 pa-2 ga-2">
      <v-btn
        variant="outlined"
        color="primary"
        @click="displayMode = 'card'"
      >
        Show the user card
      </v-btn>

      <v-btn
        variant="outlined"
        color="info"
        @click="displayMode = 'picture'"
      >
        Show the picture
      </v-btn>
    </div>
  </section>

</template>

<style scoped>
.home-svg {
  transition: fill 0.3s ease;
}

svg {
  width: 4rem;
  height: 4rem;
}
/*
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
*/

</style>

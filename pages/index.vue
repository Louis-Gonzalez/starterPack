<script setup lang="ts">
import Home from './../assets/icons/home.svg';
import Microsoft from './../assets/icons/microsoft.svg';
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
</script>

<template>
  <section>
    <h1>{{ $t('home') }}</h1>
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
</template>

<style scoped>
.home-svg {
  transition: fill 0.3s ease;
}

svg {
  width: 4rem;
  height: 4rem;
}
</style>

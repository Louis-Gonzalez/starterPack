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
  <section>
    <div>
      <p>
        <v-icon icon="mdi-home" /> // mdi est construit par defaut on n'est pas obligé de prefix dans l'attibut
        <v-icon icon="mdi:mdi-plus" />
        <v-icon icon="mdi-account" />
        <v-icon icon="fa:fa-solid fa-house" />
        <v-icon icon="fa:fa-solid fa-face-smile"/>
        <v-icon icon="fa:fa-brands fa-github" />
      </p>
      <p class="d-flex flex-wrap ga-2 coloring-icon">
        <v-icon icon="fa:fa-solid fa-server" />

        <v-icon icon="fa:fa-regular fa-square-check" />
        <v-icon icon="fa:fa-solid fa-square-check" />

        <v-icon icon="fa:fa-solid fa-clipboard-list" />

        <v-icon icon="fa:fa-solid fa-gear" />

        <v-icon icon="fa:fa-solid fa-trash" />

        <v-icon icon="fa:fa-regular fa-edit" />
        <v-icon icon="fa:fa-solid fa-edit" />

        <v-icon icon="fa:fa-regular fa-eye" />
        <v-icon icon="fa:fa-solid fa-eye" />

        <v-icon icon="fa:fa-solid fa-user" />
        <v-icon icon="fa:fa-regular fa-user" />

        <v-icon icon="fa:fa-solid fa-chevron-right" />
        <v-icon icon="fa:fa-solid fa-chevron-left" />
        <v-icon icon="fa:fa-solid fa-chevron-down" />
        <v-icon icon="fa:fa-solid fa-chevron-up" />

        <v-icon icon="fa:fa-regular fa-plus"  />
        <v-icon icon="fa:fa-solid fa-plus"  />

        <v-icon icon="fa:fa-regular fa-bell" />
        <v-icon icon="fa:fa-solid fa-bell" />

        <v-icon icon="fa:fa-regular fa-sun" />
        <v-icon icon="fa:fa-solid fa-sun" />

        <v-icon icon="fa:fa-regular fa-moon" />
        <v-icon icon="fa:fa-solid fa-moon" />

        <v-icon icon="fa:fa-solid fa-power-off" />

        <v-icon icon="fa:fa-regular fa-circle-check" />
        <v-icon icon="fa:fa-solid fa-circle-check" />

        <v-icon icon="fa:fa-solid fa-arrow-rotate-left"/>
        <v-icon icon="fa:fa-solid fa-arrow-rotate-right"/>
      </p>
    </div>

    <v-icon icon="custom:dog" color="success"/>
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
.coloring-icon{
  color: var(--main-primary);
}
</style>

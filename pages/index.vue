<script setup lang="ts">
import Home from './../assets/icons/home.svg'
const colorSvg = ['deeppink', 'darkblue', 'darkcyan', 'darkgreen', 'darkorange', 'olive', 'crimson', 'chartreuse', 'cornFlowerBlue', 'gold','magenta']

const currentColor = ref(colorSvg[0])

const changeColor = () => {
  const randomIndex = Math.floor(Math.random() * colorSvg.length)
  currentColor.value = colorSvg[randomIndex]
}

</script>

<template>
  <h1>{{$t('home')}}</h1>
  <div>
    <h2>Welcome ! This is the home page</h2>
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quaerat.
        Exercitationem dolorem quo aliquam ratione quia. Harum doloribus atque
        assumenda. Quos aspernatur laudantium quibusdam. Placeat expedita
        excepturi quis id quidem?
      </p>
      <p class="toggle-vsg-change">
        <Home :fill="currentColor" class="home-svg"/>
        <v-btn @click="changeColor">Random Colors</v-btn>
      </p>
    </div>
  </div>
</template>

<style scoped>
.home-svg {
  transition: fill 0.3s ease;
  width: 4rem;
  height: 4rem;
}

</style>

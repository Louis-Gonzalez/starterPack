<script setup lang="ts">
import { weatherData2 } from '~/components/weather/weatherData2';
import { useI18n } from 'vue-i18n';
import MicroWeather from '~/components/weather/MicroWeather.vue';

const { t } = useI18n();
console.log(weatherData2);

const cityNames = Object.values(weatherData2[0]).map(city => city.infos.nameOfCity)

const infosCitiesData = Object.values(weatherData2[0]).map(city => ({
  infos: city.infos,
}))

const microItemsByCity = Object.values(weatherData2[0]).map(city =>
  Object.values(city.caracteristic)
)
</script>

<template>
  <h1>{{ t('weather.title') }}</h1>
  <div class="d-flex flex-wrap">
    <v-card border class="ma-8 elevation-2 city-card" v-for="(city, index) in cityNames" :key="index">
      <h2 class="ml-4">{{city}}</h2>

      <div class="d-flex align-center ga-2 ma-2">

        <v-card class="ma-2 pa-2 ga-2 elevation-2  first-card">
          <img src="/favicon.ico" alt="" class="svg-class mr-2"/> Informations :
          <div v-for="item in infosCitiesData[index]" :key="index">
            <p class="my-4"><strong>{{t('weather.language')}} :</strong> {{item.language}}</p>
            <p><strong>{{t('weather.flag')}} :</strong>
              <img :src="item.srcFlag" :alt="t('item.country') + 'flag'" class="svg-class">
            </p>
          </div>
        </v-card>

        <v-card class="ma-2 pa-2 ga-2 elevation-2 second-card">
          <img src="/favicon.ico" alt="" class="svg-class mr-2"/> Caracteristics :
          <MicroWeather
            v-for="(item, i) in microItemsByCity[index]"
            :key="i"
            :item="item"
          />
        </v-card>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.city-card {
  width: 40rem;
  height: auto;
}
 .svg-class {
   width : 3rem;
   height: 1.5rem;
 }
 .first-card, .second-card {
   width : 18rem;
   height: 20rem;
 }
</style>
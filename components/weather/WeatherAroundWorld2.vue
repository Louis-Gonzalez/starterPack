<script setup lang="ts">
import { ref } from 'vue'
import { weatherData2 } from '~/components/weather/weatherData2';
import { useI18n } from 'vue-i18n';
import MicroWeather from '~/components/weather/MicroWeather.vue';

const { t } = useI18n();
console.log(weatherData2);

const cityNames = Object.values(weatherData2[0]).map(city => city.infos.nameOfCity)

const citiesData = Object.values(weatherData2[0]).map(city => ({
  infos: city.infos,
  // caracteristic: city.caracteristic
}))

console.log(citiesData)


// const itemByCity

</script>

<template>
  <h1>{{ t('weather.title') }}</h1>
  <v-card border class="ma-8 elevation-2" v-for="(city, index) in cityNames" :key="index">
    <h2 class="ml-4">{{city}}</h2>

    <div class="d-flex align-center ga-2">
      <v-card class="ma-2 pa-2 ga-2 elevation-2 " >
        <img src="/favicon.ico" alt="" class="svg-class mr-2"/> Informations :
        <div v-for="item in citiesData[index]" :ket="index">
          <p><strong>{{t('weather.language')}} :</strong> {{item.language}}</p>
          <p><strong>{{t('weather.flag')}} :</strong><img :src="item.srcFlag" :alt="t('item.country') + 'flag'" class="svg-class"></p>
        </div>
      </v-card>
      <v-card>

      </v-card>
    </div>
  </v-card>
</template>

<style scoped>
 .svg-class {
   width : 3rem;
   height: 1.5rem;
 }
</style>
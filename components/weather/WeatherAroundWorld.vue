<script setup lang="ts">
import { weatherAroundWorld } from '~/components/weather/weather';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// TODO here replace by API call
// here i have move json in other file weather.ts and import on the top

const getLabel = (key: string) => {
  const mapping: Record<string, string> = {
    temperature: 'weather.temperature',
    humidity: 'weather.humidity',
    cloudiness: 'weather.cloudiness',
    uvIndex: 'weather.uvIndex',
    language: 'weather.language',
    flag: 'weather.flag'
  }
  return mapping[key] || key
}

const units: Record<string, string> = { temperature: "°C", humidity: "%", cloudiness: "%" }

const icons: Record<string, string> = {
  temperature: '/icons/temperature-solid-full.svg',
  humidity: '/icons/droplet-solid-full.svg',
  cloudiness: '/icons/cloud-solid-full.svg',
}

const uvIndex = '/icons/sun-solid-full.svg'
</script>

<template>
  <div class="ma-2 pa-2">
    <h1>{{ t('weather.title') }}</h1>

    <div class="d-flex flex-wrap">
      <v-card
        v-for="(city, cityKey) in weatherAroundWorld"
        :key="cityKey"
        class="ma-4 pa-4"
        elevation="2"
      >
        <h2>{{ city.infos.nameOfCity }}</h2>

        <div class="d-flex flex-wrap mini-card-container">

          <v-card border class="mt-2 ma-2 pa-4 mini-card">
            <div v-for="(value, key) in city.caracteristic" :key="key" class="d-flex align-center mb-2">
              <img v-if="icons[key]" :src="icons[key]" alt="" class="icon-class mr-2"/>
              <span>{{ t(getLabel(key)) }} : {{ value }}{{ units[key] || '' }}</span>
            </div>
          </v-card>

          <v-card border class="mt-2 ma-2 pa-4 mini-card">
            <div v-for="(value, key) in city.infos" :key="key">
              <div v-if="key === 'flag'">
                <p class="d-flex align-center">
                  {{ t(getLabel(key)) }} :
                  <img :src="value" :alt="city.infos.nameOfCity + ' flag'" class="mx-2 flag-class"/>
                </p>
              </div>
              <div v-else-if="key === 'uvIndex'">
                <p class="d-flex align-center">
                  <img :src="uvIndex" alt="UV icon" class="icon-class mr-2"/>
                  {{ t(getLabel(key)) }} : {{ value }}
                </p>
              </div>
              <div v-else>
                <p>{{ t(getLabel(key)) }} : {{ value }}</p>
              </div>
            </div>
          </v-card>


        </div>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.mini-card {
  flex: 1;
  min-width: 18rem;
  max-width: 20rem;
  min-height: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.flag-class {
  width: 5rem;
  height: 3rem;
  border: #121212 1px solid;
}

.icon-class {
  width: 2rem;
  height: 2rem;
}

.mini-card-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>

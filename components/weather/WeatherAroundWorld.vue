<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const weatherAroundWorld = {
  paris: {
    caracteristic: {
      temperature: 60,
      humidity: 60,
      cloudiness: 60,
    },
    infos: {
      nameOfCity: "Paris",
      uvIndex: 5,
      language: "French",
      flag: "/flag/fr.png"
    }
  },
  tokyo: {
    caracteristic: {
      temperature: 28,
      humidity: 70,
      cloudiness: 40,
    },
    infos: {
      nameOfCity: "Tokyo",
      uvIndex: 8,
      language: "Japanese",
      flag: "/flag/jp.png"
    }
  },
  losAngeles: {
    caracteristic: {
      temperature: 25,
      humidity: 50,
      cloudiness: 20,
    },
    infos: {
      nameOfCity: "Los Angeles",
      uvIndex: 9,
      language: "English",
      flag: "/flag/us.png"
    }
  },
  melbourne: {
    caracteristic: {
      temperature: 60,
      humidity: 60,
      cloudiness: 60,
    },
    infos: {
      nameOfCity: "Melbourne",
      uvIndex: 5,
      language: "Anglais",
      flag: "/flag/au.png"
    }
  },
}

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

const units: Record<string, string> = {
  temperature: "°C",
  humidity: "%",
  cloudiness: "%"
}
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

        <div class="d-flex flex-wrap mini-card">

          <v-card border class="mt-2 ma-4 pa-4">
            <div v-for="(value, key) in city.caracteristic" :key="key">
              <p>{{ t(getLabel(key)) }} : {{ value }}{{ units[key] || '' }}</p>
            </div>
          </v-card>


          <v-card border class="mt-2 ma-4 pa-4">
            <div v-for="(value, key) in city.infos" :key="key">
              <template v-if="key === 'flag'">
                <p>{{ t(getLabel(key)) }} : <img :src="value" :alt="city.infos.nameOfCity + ' flag'" width="40" /></p>
              </template>
              <template v-else>
                <p>{{ t(getLabel(key)) }} : {{ value }}</p>
              </template>
            </div>
          </v-card>
        </div>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.mini-card {
  width: 20rem;
  min-height: 10rem;
}
</style>

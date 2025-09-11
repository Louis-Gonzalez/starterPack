<script setup lang="ts">
import {
  Notivue,
  Notification,
  lightTheme,
  pastelTheme,
  materialTheme,
  darkTheme,
  slateTheme
} from 'notivue'
import Navbar from '~/components/common/Navbar.vue';
import { onMounted, watchEffect } from 'vue';
import { useTheme } from 'vuetify';
import SpecialNotification from '~/components/common/SpecialNotification.vue';

const theme = useTheme();

onMounted(() => {
  watchEffect(() => {
    const htmlEl = document.documentElement;
    const isDark = theme.global.name.value === 'dark';

    if (isDark) {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }
  });
});
</script>

<template>
  <div>
    <NuxtLayout>
      <Navbar />
      <NuxtLoadingIndicator />
      <NuxtPage />

      <Notivue v-slot="item">
        <NotivueSwipe :item="item">

          <!-- Si on a une prop 'isSpecial' ou 'link' on rend la notif spéciale -->
<!--          <template v-if="item.props?.isSpecial || item.props?.link">-->
<!--            &lt;!&ndash; Exemple simple : tu peux remplacer par <v-alert> ou ton composant Vuetify &ndash;&gt;-->
<!--            <div class="nv-special rounded-lg p-4 shadow-md">-->
<!--              <p class="font-bold">{{ item.title }}</p>-->
<!--              <p>{{ item.message }}</p>-->
<!--              <a v-if="item.props?.link" :href="item.props.link" target="_blank" rel="noreferrer" class="nv-link underline">-->
<!--                Ouvrir le lien-->
<!--              </a>-->
<!--              <div class="mt-2">-->
<!--                <button @click="item.clear()">Fermer</button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </template>-->

          <SpecialNotification
            v-if="item.props?.isSpecial || item.props?.link"
            :item="item"
          />


          <!-- Sinon rendu par défaut (ton Notification existant) -->
          <Notification v-else :item="item" :theme="pastelTheme" />
        </NotivueSwipe>
      </Notivue>
    </NuxtLayout>
  </div>
</template>


<style>
:root {
  /* Your variables */
  --header-height: 95px;
  --container-padding: 10px;

  /* Add the top padding and place it below the header */
  --nv-root-top: calc(var(--header-height) + var(--container-padding));

  /* Add the same left-right paddings of your app container */
  --nv-root-left: var(--container-padding);
  --nv-root-right: var(--container-padding);
}

</style>


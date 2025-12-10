import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { h } from 'vue';
import { loadLocalFaIcons } from '~/utils/loadLocalFaIcons';

const localFa = loadLocalFaIcons();

const faSet = {
  component: (props: any) => {
    const icon = props.icon;
    if (!icon.startsWith('fa:')) return null;
    const raw = icon.replace('fa:', '').trim();
    // Logique pour les icônes Font Awesome
    if (raw.startsWith('fa-solid ')) {
      const name = raw.replace('fa-solid ', '');
      const Svg = localFa.solid[name];
      if (Svg) return h(Svg, props);
    }
    if (raw.startsWith('fa-regular ')) {
      const name = raw.replace('fa-regular ', '');
      const Svg = localFa.regular[name];
      if (Svg) return h(Svg, props);
    }
    if (raw.startsWith('fa-brands ')) {
      const name = raw.replace('fa-brands ', '');
      const Svg = localFa.brands[name];
      if (Svg) return h(Svg, props);
    }
    console.warn(`Icon "${icon}" non trouvé dans vos SVG locaux FA.`);
    console.log("FA SOLID:", Object.keys(localFa.solid))
    console.log("FA REGULAR:", Object.keys(localFa.regular))
    console.log("FA BRANDS:", Object.keys(localFa.brands))

    return null;
  },
};

export default defineNuxtPlugin((nuxt) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            accent: '#FF4081',
            error: '#E10600',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FF9800',
            default: '#9E9E9E',
          },
        },
      },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
        fa: faSet,
      },
    },
  });
  nuxt.vueApp.use(vuetify);
});

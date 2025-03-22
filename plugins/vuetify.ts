import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import colors from 'vuetify/util/colors';

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
            primary: '#E53935',
            secondary: '#FFCDD2',
            success: '#4CAF50',
            info: '#2196F3',
            warning: '#FB8C00',
            error: '#FF5252',
            custom1: '#9C27B0',
            custom2: '#FFEB3B',
            custom3: '#795548',
          },
        },
        dark: {
          colors: {
            primary: '#FFCDD2',
            secondary: '#E53935',
            success: '#81C784',
            info: '#64B5F6',
            warning: '#FFB74D',
            error: '#E57373',
            custom1: '#CE93D8',
            custom2: '#FFF176',
            custom3: '#A1887F',
            background: '#121212',
            text: '#FFFFFF',
          },
        },
      },
    },
  });

  nuxt.vueApp.use(vuetify);
});

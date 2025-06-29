import { config } from '@vue/test-utils';
import { vi } from 'vitest';
import { defineComponent, h } from 'vue';

// Mock des méthodes globales comme $t si tu utilises i18n
config.global.mocks = {
  t: (msg: string) => msg, // Exemple pour i18n, tu peux adapter selon ton projet
};


vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('vue-i18n', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    createI18n: (options: any) => {
      return {
        // tu peux mocker ce que tu veux ici, par ex :
        global: {
          t: (key: string) => key,  // mock simple de la fonction t
        },
      };
    },
    useI18n: () => ({
      t: (key: string) => key,
    }),
  };
});


// Mock de fetch global
vi.stubGlobal('fetch', async (url: string) => {
  // Simule une réponse pour l'URL de la page d'accueil
  if (url === 'http://localhost:3000') {
    return {
      ok: true,
      json: async () => ({ home: 'Welcome to the homepage!' }),
    };
  }

  // Simule une autre réponse pour une autre page (ex: page about)
  if (url === 'http://localhost:3000/about') {
    return {
      ok: true,
      json: async () => ({ about: 'Welcome to the about page!' }),
    };
  }

  // Simule une réponse échouée pour d'autres URLs
  return { ok: false };
});

vi.mock('*.svg', () => ({
  default: 'mock-svg',
}));

// Mock pour les imports de fichiers SVG
vi.mock('.*\\.svg$', () => {
  return {
    default: defineComponent({
      name: 'MockedSVG',
      render() {
        return h('svg');
      },
    }),
  };
});

vi.mock('../assets/icons/home.svg', () => ({
  default: {
    name: 'HomeSvg',
    template: '<div class="mock-home-svg"></div>'
  }
}));

vi.mock('../assets/icons/microsoft.svg', () => ({
  default: {
    name: 'HomeSvg',
    template: '<div class="mock-microsoft-svg"></div>'
  }
}));
// Tu peux ajouter d'autres configurations ici si nécessaire, comme un mock pour des plugins ou d'autres méthodes globales

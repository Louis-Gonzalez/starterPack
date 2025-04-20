import { config } from '@vue/test-utils';
import { vi } from 'vitest';

// Mock des méthodes globales comme $t si tu utilises i18n
config.global.mocks = {
  $t: (msg: string) => msg, // Exemple pour i18n, tu peux adapter selon ton projet
};

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

// Tu peux ajouter d'autres configurations ici si nécessaire, comme un mock pour des plugins ou d'autres méthodes globales

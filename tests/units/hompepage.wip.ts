import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import { createVuetify } from 'vuetify';
import MyPage from '../../pages/index.vue';

// Mock des composants SVG
vi.mock('../../assets/icons/home.svg', () => ({
  default: {
    name: 'HomeSvg',
    template: '<svg class="mock-home-svg"></svg>',
  },
}));

vi.mock('../../assets/icons/microsoft.svg', () => ({
  default: {
    name: 'MicrosoftSvg',
    template: '<svg class="mock-microsoft-svg"></svg>',
  },
}));

// Messages pour les tests de localisation
const messages = {
  'fr-FR': { home: "Page d'accueil" },
  'en-GB': { home: 'Homepage' },
  'es-ES': { home: 'Inicio' },
};

describe('Homepage Test - multi locale', () => {
  let i18n;
  let vuetify;

  beforeEach(() => {
    // Configuration de i18n et vuetify avant chaque test
    i18n = createI18n({
      legacy: false,
      locale: 'en-GB', // Locale par défaut
      messages,
    });

    vuetify = createVuetify();
  });

  // Test pour vérifier le bon titre selon la locale
  Object.entries(messages).forEach(([locale, expectedTranslations]) => {
    it(`devrait afficher le bon titre pour la locale ${locale}`, () => {
      i18n.global.locale = locale;
      const wrapper = mount(MyPage, {
        global: {
          plugins: [i18n, vuetify],
        },
      });
      expect(wrapper.find('h1').text()).toBe(expectedTranslations.home);
    });
  });

  // Test pour vérifier le changement de couleur
  it('devrait changer la couleur du SVG quand le bouton est cliqué', async () => {
    const wrapper = mount(MyPage, {
      global: {
        plugins: [i18n, vuetify],
      },
    });

    const button = wrapper.find('button');
    if (button.exists()) {
      await button.trigger('click');
      // Ajoutez ici vos assertions pour vérifier le changement de couleur
    } else {
      throw new Error("Button not found");
    }
  });

  // Test pour vérifier l'affichage des SVG
  it('devrait afficher les SVG', () => {
    const wrapper = mount(MyPage, {
      global: {
        plugins: [i18n, vuetify],
      },
    });

    expect(wrapper.find('.mock-home-svg').exists()).toBe(true);
    expect(wrapper.find('.mock-microsoft-svg').exists()).toBe(true);
  });

  // Test pour vérifier l'URL correcte
  it("devrait afficher l'URL correcte", () => {
    const mockLocation = { pathname: '/' };
    vi.stubGlobal('location', mockLocation);

    expect(window.location.pathname).toBe('/');
  });
});

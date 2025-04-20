import { fr as $vuetify } from 'vuetify/locale';

import localeFR from '~/i18n/locales/fr-FR.json';
import localeEN from '~/i18n/locales/en-GB.json';
import localeES from '~/i18n/locales/es-ES.json';
import localeDE from '~/i18n/locales/de-DE.json';

export default {
  legacy: false,
  locale: 'en-GB',
  fallbackLocale: 'en-GB',
  messages: {
    'fr-FR': { ...localeFR, $vuetify },
    'en-GB': { ...localeEN },
    'es-ES': { ...localeES },
    'de-DE': { ...localeDE },
  },
};


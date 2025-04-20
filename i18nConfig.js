import { fr as $vuetify } from 'vuetify/lib/locale';
import localeFR from '~/i18n/locales/fr-FR.json';
import localeEN from '~/i18n/locales/en-GB.json';
import localeES from '~/i18n/locales/es-ES.json';
import localeDE from '~/i18n/locales/de-DE.json';

const messages = {
  ...localeFR,
  ...localeEN,
  ...localeES,
  ...localeDE,
  ...$vuetify,
};
export default messages;

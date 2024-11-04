// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import pt from './pt.json';
import es from './es.json';
import fr from './fr.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: 'en',
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      es: { translation: es },
      fr: { translation: fr }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

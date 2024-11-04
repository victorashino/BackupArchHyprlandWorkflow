import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './en.json'; 
import fr from './fr.json';
import pt from './pt.json';
import es from './es.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  pt: { translation: pt },
  es: { translation: es },
};

const deviceLanguage = Localization.locale.split('-')[0] || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: deviceLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
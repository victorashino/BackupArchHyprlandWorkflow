import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import languageDetector from 'i18next-react-native-language-detector';

import {pt} from './pt';
import {en} from './en';
import {es} from './es';


const resources = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
  es: {
    translation: es,
  },
};


i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
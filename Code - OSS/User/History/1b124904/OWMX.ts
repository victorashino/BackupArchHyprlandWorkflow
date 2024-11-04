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
    fallbackLng: 'en', // Idioma padrão se não encontrar a tradução específica
    debug: true, // Ative para ver mensagens de debug no console
    interpolation: {
      escapeValue: false, // Evita escapar valores de tradução
    },
    react: {
      useSuspense: false, // Define se o hook useTranslation deve usar suspense (não suportado no React Native)
    },
  });

export default i18n;
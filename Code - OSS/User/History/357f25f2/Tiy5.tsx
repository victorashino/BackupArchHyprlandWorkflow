import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './en.json';  // Ajuste os caminhos para os arquivos de tradução conforme necessário
import pt from './pt.json';  // Ajuste os caminhos para os arquivos de tradução conforme necessário

// Configura o i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    lng: Localization.locale,  // Define o idioma com base na configuração do dispositivo
    fallbackLng: 'en',  // Idioma padrão se o idioma atual não estiver disponível
    interpolation: {
      escapeValue: false,  // React já faz o escaping dos valores
    },
  });

export default i18n;

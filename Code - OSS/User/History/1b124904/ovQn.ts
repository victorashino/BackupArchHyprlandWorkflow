import TranslatePT from './pt.json';
import TranslateEN from './en.json';
import TranslateES from './es.json';

export const getTranslation = () => {
  switch (global.lang) {
    case 'pt':
      return TranslatePT;
    case 'en':
      return TranslateEN;
    case 'es':
      return TranslateES;
    default:
      return TranslatePT;
  }
};

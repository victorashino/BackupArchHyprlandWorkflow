import TranslatePT from './pt.json';
import TranslateEN from './en.json';
import TranslateES from './es.json';

let lang = 'en'

export const getTranslation = () => {
  switch (lang) {
    case 'en':
      return TranslateEN;
    case 'es':
      return TranslateES;
    default:
      return TranslatePT;
  }
};

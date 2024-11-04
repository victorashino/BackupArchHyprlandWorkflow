import TranslatePT from './pt.json';
import TranslateEN from './en.json';
import TranslateES from './es.json';

let lang = 'en'

export const getTranslation = () => {
  switch (lang) {
    case 'pt':
      return TranslatePT;
    case 'en':
      return TranslateEN;
    case 'es':
      return TranslateES;
  }
};

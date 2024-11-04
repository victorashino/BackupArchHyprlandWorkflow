import {pt} from './pt';
import {ingles} from './en';
import TranslateES from './es.json';

let lang = 'pt'

export const getTranslation = () => {
  switch (lang) {
    case 'pt':
      return pt;
    case 'en':
      return ingles;
    case 'es':
      return TranslateES;
  }
};

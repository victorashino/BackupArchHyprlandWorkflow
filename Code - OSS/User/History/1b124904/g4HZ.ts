import {pt} from './pt';
import {en} from './en';
import {es} from './es';

let lang = 'pt'

export const getTranslation = () => {
  switch (lang) {
    case 'pt':
      return pt;
    case 'en':
      return en;
    case 'es':
      return es;
  }
};

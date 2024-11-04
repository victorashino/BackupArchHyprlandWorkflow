import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import languageDetector from 'i18next-react-native-language-detector';

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

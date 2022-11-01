import i18next from 'i18next';
import danish from './da.json';
import english from './en.json';
import {initReactI18next} from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';

i18next
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'da'],
    ns: [],
    defaultNS: undefined,
    resources: {
      en: english,
      da: danish,
    },
    react: {
      useSuspense: false,
    },
    compatibilityJSON: 'v3',
  });

export default i18next;

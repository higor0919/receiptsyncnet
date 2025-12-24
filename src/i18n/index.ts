import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import pt from './locales/pt.json';
import ja from './locales/ja.json';

// Get browser language and extract the base language code
const getBrowserLanguage = (): string => {
  const browserLang = navigator.language || 'en';
  // Extract base language (e.g., 'en-US' -> 'en', 'pt-BR' -> 'pt')
  const baseLang = browserLang.split('-')[0];
  
  // Check if we support this language
  const supportedLanguages = ['en', 'pt', 'ja'];
  return supportedLanguages.includes(baseLang) ? baseLang : 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      ja: { translation: ja },
    },
    lng: getBrowserLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

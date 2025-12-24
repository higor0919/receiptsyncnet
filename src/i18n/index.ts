import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import pt from './locales/pt.json';
import ja from './locales/ja.json';

const SUPPORTED_LANGUAGES = ['en', 'pt', 'ja'];

// Country to language mapping for IP-based detection
const countryToLanguage: Record<string, string> = {
  // Portuguese
  BR: 'pt', PT: 'pt', AO: 'pt', MZ: 'pt',
  // Japanese
  JP: 'ja',
  // English (default for most)
  US: 'en', GB: 'en', AU: 'en', CA: 'en', NZ: 'en', IE: 'en',
};

// Fetch language based on IP geolocation
const detectLanguageByIP = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://ipapi.co/json/', { 
      signal: AbortSignal.timeout(3000) // 3 second timeout
    });
    if (!response.ok) return null;
    
    const data = await response.json();
    const countryCode = data.country_code;
    
    if (countryCode && countryToLanguage[countryCode]) {
      return countryToLanguage[countryCode];
    }
    return null;
  } catch (error) {
    console.log('IP detection failed, using browser language');
    return null;
  }
};

// Initialize i18n with browser detection first
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      ja: { translation: ja },
    },
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES,

    // Critical: ensure en-US / ja-JP resolves to base language resources
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,
    cleanCode: true,

    detection: {
      // Order of detection methods
      order: ['localStorage', 'navigator', 'htmlTag'],
      // Cache user language in localStorage
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
      escapeValue: false,
    },
  });

// After initial load, try IP-based detection if no preference is saved
const initIPDetection = async () => {
  const savedLang = localStorage.getItem('i18nextLng');
  
  // Only do IP detection if user hasn't manually selected a language
  if (!savedLang || !SUPPORTED_LANGUAGES.includes(savedLang)) {
    const ipLang = await detectLanguageByIP();
    if (ipLang && SUPPORTED_LANGUAGES.includes(ipLang)) {
      i18n.changeLanguage(ipLang);
    }
  }
};

// Run IP detection in background (non-blocking)
initIPDetection();

export default i18n;

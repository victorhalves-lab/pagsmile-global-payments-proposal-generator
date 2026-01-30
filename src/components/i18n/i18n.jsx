
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import pt from './locales/pt';
import zh from './locales/zh';

const savedLanguage = localStorage.getItem('language') || 'pt';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      zh: { translation: zh }
    },
    lng: savedLanguage,
    fallbackLng: 'en', // Changed from 'pt' to 'en'
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

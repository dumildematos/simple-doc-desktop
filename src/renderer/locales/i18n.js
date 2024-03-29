import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { DateTime } from 'luxon';
import translationEN from './en/en.json';
import translationPT from './pt/pt.json';

const resources = {
  en: {
    translation: translationEN,
  },
  pt: {
    translation: translationPT,
  },
};

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    lng: localStorage.getItem('i18nextLng')
      ? localStorage.getItem('i18nextLng')
      : 'pt',
    resources,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      format: (value, format, lng) => {
        if (value instanceof Date) {
          return DateTime.fromJSDate(value)
            .setLocale(lng)
            .toLocaleString(DateTime[format]);
        }
        return value;
      },
    },
  });

export default i18n;

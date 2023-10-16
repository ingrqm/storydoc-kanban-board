import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as locales from './locales';

export const defaultLanguage = 'en';

export type Language = keyof typeof locales;

export const languages = Object.keys(locales) as Language[];

const resources = Object.entries(locales).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: { translation: value },
  };
}, {});

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
});

i18n.on('languageChanged', (language) => (document.documentElement.lang = language));

document.documentElement.lang = i18n.language;

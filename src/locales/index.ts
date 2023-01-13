import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

import * as en from './en.json';
import * as ru from './ru.json';

const resources = {
    en: { translation: en },
    ru: { translation: ru }
};

i18n.use(detector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;

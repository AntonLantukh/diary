import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import {initReactI18next} from 'react-i18next';

import {COMMON_NAMESPACES} from 'shared/constants/i18n';

export const defaultOptions = {
    detection: {lookupCookie: 'locale', order: ['cookie', 'header']},
    supportedLngs: ['ru', 'en'],
    fallbackLng: 'en',
    ns: [...COMMON_NAMESPACES, 'main'],
    defaultNS: 'main',
    backend: {
        loadPath: 'locales/{{ns}}/{{lng}}/index.json',
        jsonIndent: 4,
    },
    react: {
        useSuspense: false,
    },
};

export const setupI18Next = async (locale: string): Promise<typeof i18next> => {
    if (!i18next.isInitialized) {
        await i18next
            .use(Backend)
            .use(initReactI18next)
            .init({
                lng: locale,
                ...defaultOptions,
            });
    }

    return i18next;
};

import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

export const defaultOptions = {
    whitelist: ['ru', 'en'],
    fallbackLng: 'en',
    ns: ['header', 'main'],
    defaultNS: 'main',
    interpolation: {
        escapeValue: false,
    },
    react: {
        useSuspense: false,
    },
};

export const setupI18Next = async (language: string): Promise<typeof i18next> => {
    if (!i18next.isInitialized) {
        await i18next.use(initReactI18next).init({
            lng: language,
            ...defaultOptions,
        });
    }

    return i18next;
};

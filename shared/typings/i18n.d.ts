export type I18nKeys = {
    [locale: string]: Record<string, string | Record<string, string>>;
};

export type I18n = {
    locale: string;
    i18nKeys: I18nKeys;
};

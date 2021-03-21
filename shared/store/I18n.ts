import {action, makeObservable, observable} from 'mobx';

import {I18n, I18nKeys} from 'shared/typings/i18n';

export interface I18nStoreInterface extends I18n {
    changeLocale(locale: string): void;
}

type Params = {
    locale: string;
    i18nKeys: I18nKeys;
};

export default class I18nStore implements I18nStoreInterface {
    locale;

    i18nKeys;

    constructor({locale, i18nKeys}: Params) {
        this.locale = locale;
        this.i18nKeys = i18nKeys;

        makeObservable(this, {
            locale: observable,
            changeLocale: action.bound,
        });
    }

    changeLocale(locale: string): void {
        this.locale = locale;
    }
}

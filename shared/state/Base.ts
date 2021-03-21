import {StateInterface} from 'shared/typings/state';

import CommonStore from 'shared/store/Common';
import I18nStore from 'shared/store/I18n';

import {I18n} from 'shared/typings/i18n';
import {Common} from 'shared/typings/common';

type OwnStore = {
    common: CommonStore;
    i18n: I18nStore;
};

type Props = {
    common: Common;
    i18n: I18n;
};

export type BaseStateT = OwnStore;

export default class BaseState implements BaseStateT, StateInterface {
    common;

    i18n;

    constructor({common, i18n}: Props) {
        this.common = new CommonStore(common);
        this.i18n = new I18nStore(i18n);
    }
}

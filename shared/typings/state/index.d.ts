import {IObservableValue} from 'mobx';

import {Common} from 'shared/typings/common';
import {I18n} from 'shared/typings/i18n';

import {CommonStoreInterface} from 'shared/store/Common';
import {I18nStoreInterface} from 'shared/store/I18n';

export type BaseState = {
    common: Common;
    i18n: I18n;
};

export type BaseMobxState = {
    common: CommonStoreInterface;
    i18n: I18nStoreInterface;
};

export type BaseStateExtened<T> = T & Base;
export type BaseMobxStateExtended<T> = BaseMobxState & T;
export type StateInterface = Record<unknown, IObservableValue<unknown>>;

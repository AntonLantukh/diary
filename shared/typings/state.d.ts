import {IObservableValue} from 'mobx';

import {Common} from 'shared/typings/common';
import {User} from 'shared/typings/user';
import {I18n} from 'shared/typings/i18n';

import {CommonStoreInterface} from 'shared/store/Common';
import {UserStoreInterface} from 'shared/store/User';
import {I18nStoreInterface} from 'shared/store/I18n';

export type BaseState = {
    common: Common;
    i18n: I18n;
    user: User | null;
};

export type BaseMobxState = {
    user: UserStoreInterface | null;
    common: CommonStoreInterface;
    i18n: I18nStoreInterface;
};

export type BaseStateExtened<T> = BaseState & T;
export type BaseMobxStateExtended<T> = BaseMobxState & T;
export type StateInterface = Record<unknown, IObservableValue<unknown>>;

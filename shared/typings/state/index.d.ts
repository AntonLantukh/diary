import {IObservableValue} from 'mobx';

import {Common} from 'shared/typings/common';

import {CommonStore} from 'shared/store/Common';

export type BaseState<T> = T & {
    common: Common;
};

export type BaseMobxState<T> = {
    common: CommonStore;
} & T;

export type StateInterface = Record<unknown, IObservableValue<unknown>>;

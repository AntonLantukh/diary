import {State} from 'shared/pages/Cabinet/typings';
import {StateInterface} from 'shared/typings/state';

import CommonStore from 'shared/store/Common';

type OwnStore = {
    common: CommonStore;
};

export type BaseStateT = OwnStore;

export default class BaseState implements BaseStateT, StateInterface {
    common;

    constructor({common}: State) {
        this.common = new CommonStore(common);
    }
}

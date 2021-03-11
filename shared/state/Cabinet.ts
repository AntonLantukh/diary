import {State} from 'shared/pages/Cabinet/typings';
import {StateInterface} from 'shared/typings/state';

import UserStore from 'shared/store/User';
import RecordStore from 'shared/store/Record';
import CommonStore from 'shared/store/Common';

type OwnStore = {
    user: UserStore;
    records: RecordStore;
    common: CommonStore;
};

export type MainState = OwnStore;

export default class AccountState implements OwnStore, StateInterface {
    user;

    records;

    common;

    constructor({user, records, common}: State) {
        this.user = new UserStore(user);
        this.records = new RecordStore(records);
        this.common = new CommonStore(common);
    }
}

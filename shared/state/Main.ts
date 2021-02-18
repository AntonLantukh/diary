import {State} from 'shared/pages/Cabinet/typings';
import {StateInterface} from 'shared/typings/state';

import AccountStore from 'shared/store/Account';
import RecordStore from 'shared/store/Record';
import CommonStore from 'shared/store/Common';

type OwnStore = {
    account: AccountStore;
    records: RecordStore;
    common: CommonStore;
};

export type MainStateT = OwnStore;

export default class AccountState implements OwnStore, StateInterface {
    account;

    records;

    common;

    constructor({account, records, common}: State) {
        this.account = new AccountStore(account);
        this.records = new RecordStore(records);
        this.common = new CommonStore(common);
    }
}

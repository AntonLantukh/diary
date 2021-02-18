import {State} from 'shared/pages/Cabinet/typings';
import {BaseMobxState, StateInterface} from 'shared/typings/state';

import AccountStore from 'shared/store/Account';
import RecordStore from 'shared/store/Record';
import CommonStore from 'shared/store/Common';

type OwnStore = {
    account: AccountStore;
    records: RecordStore;
};

export type CabinetStateT = BaseMobxState<OwnStore>;

export default class CabinetState implements CabinetStateT, StateInterface {
    account;

    records;

    common;

    constructor({account, records, common}: State) {
        this.account = new AccountStore(account);
        this.records = new RecordStore(records);
        this.common = new CommonStore(common);
    }
}

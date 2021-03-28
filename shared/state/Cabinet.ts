import {StateInterface, BaseStateExtened} from 'shared/typings/state';
import {State} from 'shared/pages/Cabinet/typings';

import BaseState from 'shared/state/Base';

import UserStore from 'shared/store/User';
import RecordStore from 'shared/store/Record';

type OwnStore = {
    user: UserStore;
    records: RecordStore;
};

export type MainState = OwnStore;

export default class Cabinet extends BaseState implements StateInterface {
    user;

    records;

    constructor({user, records, i18n, common}: BaseStateExtened<State>) {
        super({common, i18n});

        this.user = new UserStore(user);
        this.records = new RecordStore(records);
    }
}

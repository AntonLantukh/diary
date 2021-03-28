import {StateInterface, BaseStateExtened} from 'shared/typings/state';
import {State} from 'shared/pages/Main/typings';

import BaseState from 'shared/state/Base';

import UserStore from 'shared/store/User';
import RecordStore from 'shared/store/Record';
import CommonStore from 'shared/store/Common';
import I18nStore from 'shared/store/I18n';

type OwnStore = {
    user: UserStore;
    records: RecordStore;
    common: CommonStore;
    i18n: I18nStore;
};

export type MainState = OwnStore;

export default class Main extends BaseState implements OwnStore, StateInterface {
    user;

    records;

    constructor({user, records, common, i18n}: BaseStateExtened<State>) {
        super({common, i18n});

        this.user = new UserStore(user);
        this.records = new RecordStore(records);
    }
}

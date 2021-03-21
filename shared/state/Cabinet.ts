import {State} from 'shared/pages/Main/typings';

import {StateInterface, BaseMobxStateExtended, BaseStateExtended} from 'shared/typings/state';

import BaseState from 'shared/state/Base';

import UserStore from 'shared/store/User';
import RecordStore from 'shared/store/Record';
import CommonStore from 'shared/store/Common';
import I18nStore from 'shared/store/I18n';

type OwnStore = {
    user: UserStore;
    records: RecordStore;
};

export type MainState = OwnStore;

export default class Cabinet extends BaseState implements StateInterface {
    user;

    records;

    constructor({user, records, common, i18n}: BaseMobxStateExtended<OwnStore>) {
        super({common, i18n});

        this.user = new UserStore(user);
        this.records = new RecordStore(records);
    }
}

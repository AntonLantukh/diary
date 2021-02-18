import {Account} from 'shared/typings/account';
import {Record} from 'shared/typings/record';
import {BaseState} from 'shared/typings/state';

type OwnState = {
    account: Account;
    records: Record[];
};

export type State = BaseState<OwnState>;

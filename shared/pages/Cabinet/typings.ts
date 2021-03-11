import {User} from 'shared/typings/user';
import {Record} from 'shared/typings/record';
import {BaseState} from 'shared/typings/state';

type OwnState = {
    user: User;
    records: Record[];
};

export type State = BaseState<OwnState>;

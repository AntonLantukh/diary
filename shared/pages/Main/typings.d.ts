import {User} from 'shared/typings/user';
import {Record} from 'shared/typings/record';
import {BaseStateExtened} from 'shared/typings/state';

export type OwnState = {
    user: User;
    records: Record[];
};

export type State = BaseStateExtened<OwnState>;

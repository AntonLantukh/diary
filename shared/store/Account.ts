import {action, computed, makeObservable, observable} from 'mobx';

import {Account} from 'shared/typings/account';

interface AccountStoreInterface extends Account {
    getFullName: string;
    editName(name: string): void;
}

export default class AccountStore implements AccountStoreInterface {
    id;

    name;

    surname;

    email;

    constructor({id, name, surname, email}: Account) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;

        makeObservable(this, {
            id: observable,
            name: observable,
            surname: observable,
            email: observable,
            getFullName: computed,
            editName: action.bound,
        });
    }

    get getFullName(): string {
        return `${this.name} ${this.surname}`;
    }

    editName(name: string): void {
        this.name = name;
    }
}

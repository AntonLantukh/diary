import {ParsedQs} from 'qs';

import {action, computed, makeObservable, observable} from 'mobx';

import {Common} from 'shared/typings/common';

export interface CommonStoreInterface extends Common {
    initialize(): void;
    keysetName: string;
}

type Params = {
    query: ParsedQs;
    pathName: string;
    pageName: string;
};

export default class CommonStore implements CommonStoreInterface {
    isInitialized = false;

    pathName;

    pageName;

    query = {};

    constructor({query, pathName, pageName}: Params) {
        this.query = query;
        this.pathName = pathName;
        this.pageName = pageName;

        makeObservable(this, {
            isInitialized: observable,
            initialize: action,
            keysetName: computed,
        });
    }

    initialize(): void {
        this.isInitialized = true;
    }

    get keysetName(): string {
        return this.pageName.toLocaleLowerCase();
    }
}

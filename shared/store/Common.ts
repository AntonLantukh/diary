import {ParsedQs} from 'qs';

import {action, makeObservable, observable} from 'mobx';

import {Common} from 'shared/typings/common';

export interface CommonStoreInterface extends Common {
    initialize(): void;
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
        });
    }

    initialize(): void {
        this.isInitialized = true;
    }
}

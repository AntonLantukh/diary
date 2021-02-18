import {computed, makeObservable, observable} from 'mobx';

import {Record} from 'shared/typings/record';

interface RecordStateInterface {
    getFullRecord: string[];
}

export default class RecordState implements RecordStateInterface {
    records;

    constructor(records: Record[]) {
        this.records = records;

        makeObservable(this, {
            records: observable,
            getFullRecord: computed,
        });
    }

    get getFullRecord(): string[] {
        return this.records.map(r => r.title + r.content);
    }
}

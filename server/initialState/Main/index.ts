import {ParsedQs} from 'qs';

import MainState from 'shared/state/Main';

import {mockRecords} from 'shared/spec/mocks/record';
import {mockAccount} from 'shared/spec/mocks/account';

export default async (query: ParsedQs, pathName: string, pageName: string): Promise<MainState> => {
    const account = await Promise.resolve(mockAccount);
    const records = await Promise.resolve(mockRecords);

    return new MainState({records, account, common: {query, pathName, pageName}});
};

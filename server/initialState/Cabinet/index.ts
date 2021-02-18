import {ParsedQs} from 'qs';

import CabinetState from 'shared/state/Cabinet';

import {mockRecords} from 'shared/spec/mocks/record';
import {mockAccount} from 'shared/spec/mocks/account';

export default async (query: ParsedQs, pathName: string, pageName: string): Promise<CabinetState> => {
    const account = await Promise.resolve(mockAccount);
    const records = await Promise.resolve(mockRecords);

    return new CabinetState({records, account, common: {query, pathName, pageName}});
};

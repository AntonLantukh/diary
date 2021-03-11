import {ParsedQs} from 'qs';

import CabinetState from 'shared/state/Cabinet';

import {mockRecords} from 'shared/spec/mocks/record';
import {mockUser} from 'shared/spec/mocks/user';

export default async (query: ParsedQs, pathName: string, pageName: string): Promise<CabinetState> => {
    const user = await Promise.resolve(mockUser);
    const records = await Promise.resolve(mockRecords);

    return new CabinetState({records, user, common: {query, pathName, pageName}});
};

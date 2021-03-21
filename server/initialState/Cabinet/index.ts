import {ParsedQs} from 'qs';

import {OwnState} from 'shared/pages/Cabinet/typings';

import {mockRecords} from 'shared/spec/mocks/record';
import {mockUser} from 'shared/spec/mocks/user';

export default async (query: ParsedQs): Promise<OwnState> => {
    const user = await Promise.resolve(mockUser);
    const records = await Promise.resolve(mockRecords);

    return {records, user};
};

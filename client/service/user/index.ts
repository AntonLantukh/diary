import request from 'client/request';

import {API_ROUTE} from 'shared/constants/routes';

type GetUserArgs = Record<string, never>;

class UserService {
    async getUser(params: GetUserArgs) {
        const response = await request.buildRequest<void>({url: API_ROUTE.user, params});

        return response;
    }
}

export default new UserService();

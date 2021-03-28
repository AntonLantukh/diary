import request from 'shared/request';

import {METHOD} from 'shared/constants/method';

type RegisterUserArgs = {
    email: string;
    password: string;
    passwordConfirm: string;
};

export const registerUser = async (params: RegisterUserArgs): Promise<void> =>
    request.buildRequest<void>('/api/register', params, {method: METHOD.POST});

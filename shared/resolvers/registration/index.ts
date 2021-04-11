import request from 'shared/request';

import {METHOD} from 'shared/constants/request';

type RegisterUserArgs = {
    email: string;
    password: string;
    passwordConfirm: string;
};

type LoginUserArgs = {
    email: string;
    password: string;
};

export const registerUser = async (params: RegisterUserArgs): Promise<void> =>
    request.buildRequest<void>({url: '/api/auth/register', params, config: {method: METHOD.POST}});

export const loginUser = async (params: LoginUserArgs): Promise<void> =>
    request.buildRequest<void>({url: '/api/auth/login', params, config: {method: METHOD.POST}});

export const getUpdatedToken = async (params = {}): Promise<void> =>
    request.buildRequest<void>({url: '/api/auth/refresh-token', params});

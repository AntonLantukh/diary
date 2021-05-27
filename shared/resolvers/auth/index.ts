import request from 'shared/request';

import {METHOD} from 'shared/constants/request';

type SignUpUserArgs = {
    email: string;
    password: string;
    passwordConfirm: string;
};

type SignInUserArgs = {
    email: string;
    password: string;
};

export const signUpUser = async (params: SignUpUserArgs): Promise<void> =>
    request.buildRequest<void>({url: '/api/auth/sign-up', params, config: {method: METHOD.POST}});

export const signInUser = async (params: SignInUserArgs): Promise<void> =>
    request.buildRequest<void>({url: '/api/auth/sign-in', params, config: {method: METHOD.POST}});

export const getUpdatedToken = async (params = {}): Promise<void> =>
    request.buildRequest<void>({url: '/api/auth/refresh-token', params});

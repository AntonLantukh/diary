import request from 'client/request';

import {METHOD} from 'shared/constants/request';
import {API_ROUTE, PUBLIC_ROUTE} from 'shared/constants/routes';

import accessTokenManager from '../../auth/token';

export type SignUpUserArgs = {
    email: string;
    password: string;
    passwordConfirm: string;
};

export type SignInUserArgs = {
    email: string;
    password: string;
};

export type SignInRes = {
    accessToken: string;
};

class AuthService {
    async signIn(params: SignInUserArgs) {
        await request
            .buildRequest<SignInRes>({
                url: API_ROUTE.signIn,
                params,
                config: {method: METHOD.POST},
            })
            .then(({accessToken}) => {
                accessTokenManager.setAccessToken(accessToken);
                window.location.href = PUBLIC_ROUTE.main;
            });
    }

    async signUp(params: SignUpUserArgs) {
        await request.buildRequest<void>({
            url: API_ROUTE.signUp,
            params,
            config: {method: METHOD.POST},
        });
    }

    async signOut() {
        await request
            .buildRequest<void>({
                url: API_ROUTE.signOut,
                config: {method: METHOD.POST},
            })
            .then(() => {
                accessTokenManager.ereaseAccessToken();
                window.location.href = PUBLIC_ROUTE.main;
            });
    }

    async getUpdatedToken() {
        await request.buildRequest<void>({url: API_ROUTE.refreshToken});
    }
}

export default new AuthService();

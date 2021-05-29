import FetchRequest from 'shared/request';
import {mergeDeepRight} from 'ramda';

import accessTokenManager from '../auth/token';

import {IncomingRequest} from 'shared/typings/request';

import {API_ROUTE, PUBLIC_ROUTE} from 'shared/constants/routes';

class FrontRequest extends FetchRequest {
    origRequest: IncomingRequest | null = null;

    public async buildRequest<T>(req: IncomingRequest): Promise<T> {
        this.origRequest = req;
        const accessToken = accessTokenManager.getAccessToken();
        const request = mergeDeepRight(req, {config: {headers: {'X-Access-Token': accessToken}}});

        return super.buildRequest(request).then(this.handleResponse).catch(this.handleError) as Promise<T>;
    }

    protected handleResponse(response: Response): Promise<any> {
        if (!response.ok) {
            return Promise.reject(response);
        }

        if (response.redirected) {
            window.location.href = response.url;
        }

        if (/json/.test(response.headers.get('content-type') || '')) {
            return response.json();
        }

        return response.text();
    }

    protected async handleError(res: Response): Promise<any> {
        if (res.status === 401) {
            const refreshTokenResponse = await super.buildRequest({url: API_ROUTE.refreshToken});

            // If refresh token genretaion failed => go to main
            if (refreshTokenResponse.redirected) {
                window.location.href = PUBLIC_ROUTE.main;
            }

            const accessToken = refreshTokenResponse.headers.get('X-Access-Token') as string;
            accessTokenManager.setAccessToken(accessToken);

            // Repeat original request with new access token
            return this.buildRequest(this.origRequest as IncomingRequest);
        }

        if (res.status === 403) {
            window.location.href = PUBLIC_ROUTE.main;
        }
    }
}

export default new FrontRequest();

import fetch from 'isomorphic-fetch';
import {mergeDeepRight} from 'ramda';

import {METHOD} from 'shared/constants/method';

type Params = Record<string, string | number | (string | number)[]>;

type Body = FormData | string;

type RequestIncomingConfig = {
    method?: string;
    mode?: 'cors' | 'no-cors' | 'navigate' | 'same-origin';
    credentials?: 'include' | 'omit' | 'same-origin';
    headers?: {
        'Content-Type'?: 'multipart/form-data' | 'application/json';
    };
};

type RequestFetchConfig = {
    method: string;
    mode: 'cors' | 'no-cors' | 'navigate' | 'same-origin';
    credentials: 'include' | 'omit' | 'same-origin';
    headers: {
        'Content-Type': 'multipart/form-data' | 'application/json';
    };
};

const BASE_REQUEST: RequestIncomingConfig = {
    method: METHOD.GET,
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
};

class Request {
    buildRequest<T>(url: string, params: Params, request?: RequestIncomingConfig): Promise<T> {
        const parsedParams = this.omitNil(params);
        const mergedRequest = mergeDeepRight(BASE_REQUEST, request || {}) as RequestFetchConfig;
        const requestURL = this.createURL(mergedRequest, url, parsedParams);
        const body = this.prepareRequestBody(mergedRequest, parsedParams);
        const config = mergedRequest.method === METHOD.GET ? mergedRequest : {...mergedRequest, body};

        return fetch(requestURL, config).then(data => this.handleResponse(data));
    }

    private prepareRequestBody(request: RequestFetchConfig, params: Params): Body {
        if (request?.headers?.['Content-Type'] === 'multipart/form-data') {
            const formData = new FormData();
            for (const name in params) {
                formData.append(name, String(params[name]));
            }
            return formData;
        }

        return this.toQueryString(params || {});
    }

    private handleResponse<M>(response: Response): Promise<M> {
        return response.json().then(res => {
            if (response.status === 403) {
                throw new Error();
            }
            if (response.ok) {
                return res;
            } else {
                return Promise.reject(res);
            }
        });
    }

    private createURL(request: RequestFetchConfig, url: string, params: Params): string {
        if (__IS_BROWSER__) {
            return request.method === METHOD.GET ? `${url}${this.toQueryString(params)}` : url;
        }

        return url;
    }

    private toQueryString(params: Params): string {
        const data = Object.keys(params)
            .map(key => {
                const value = params[key];

                return `${key}=${encodeURIComponent(Array.isArray(value) ? value.join(',') : value)}`;
            })
            .join('&');

        return `?${data}`;
    }

    private omitNil(data: Params): Params {
        if (typeof data !== 'object') {
            return data;
        }

        return Object.keys(data)
            .filter(el => Boolean(data[el]))
            .reduce((acc, value) => ({...acc, [value]: data[value]}), {});
    }
}

export default new Request();

import fetch from 'isomorphic-fetch';
import {mergeDeepRight} from 'ramda';

import {METHOD, CONTENT_TYPE_HEADER, BASE_REQUEST} from 'shared/constants/request';
import {IncomingConfig, IncomingRequest, ContentType, Params, Body, RequestFetchConfig} from 'shared/typings/request';

class FetchRequest {
    private accessToken: string | undefined;

    buildRequest(incomingRequest: IncomingRequest): Promise<any> {
        const {url, params, config} = incomingRequest;
        const parsedParams = this.omitNil(params);
        const contentType = this.parseContentType(config);
        const body = this.prepareRequestBody(contentType, parsedParams);

        const options = this.mergeRequest(config, contentType, body);
        const request = new Request(this.createURL(options, url, parsedParams), options);

        return fetch(request)
            .then(res => this.handleResponse(res))
            .catch(this.handleError);
    }

    private prepareRequestBody(contentType: ContentType, params: Params): Body {
        if (contentType === 'multipart/form-data') {
            const formData = new FormData();
            for (const name in params) {
                formData.append(name, String(params[name]));
            }
            return formData;
        }

        return this.toUrlEncoded(params || {});
    }

    private handleResponse(response: Response): Promise<any> {
        if (!response.ok) {
            return Promise.reject(response);
        }

        if (/json/.test(response.headers.get('content-type') || '')) {
            return response.json();
        }

        return response.text();
    }

    private handleError(response: Response): any {
        return response.body;
    }

    private mergeRequest(
        request: IncomingConfig | undefined,
        contentType: ContentType,
        body: Body,
    ): RequestFetchConfig {
        const mergedRequest = mergeDeepRight(
            {...BASE_REQUEST, headers: {...BASE_REQUEST.headers, 'Content-Type': contentType}},
            request || {},
        ) as RequestFetchConfig;

        return mergedRequest.method === METHOD.GET ? mergedRequest : {...mergedRequest, body};
    }

    private parseContentType(request: IncomingConfig | undefined): ContentType {
        const contentType = this.getContentType(request);

        return contentType || CONTENT_TYPE_HEADER[request?.method || METHOD.GET];
    }

    private getContentType(request: IncomingConfig | undefined): ContentType | undefined {
        return request?.headers?.['Content-Type'];
    }

    private createURL(request: RequestFetchConfig, url: string, params: Params): string {
        if (__IS_BROWSER__) {
            return request.method === METHOD.GET ? `${url}${this.toQueryString(params)}` : url;
        }

        return url;
    }

    private toUrlEncoded(params: Params): string | undefined {
        const data = Object.keys(params)
            .map(key => `${key}=${encodeURIComponent(String(params[key]))}`)
            .join('&');

        return data;
    }

    private toQueryString(params: Params): string {
        const urlEncoded = this.toUrlEncoded(params);

        return urlEncoded ? `?${urlEncoded}` : '';
    }

    private omitNil(data?: Params): Params {
        if (typeof data !== 'object') {
            return {};
        }

        return Object.keys(data)
            .filter(el => Boolean(data[el]))
            .reduce((acc, value) => ({...acc, [value]: data[value]}), {});
    }
}

export default new FetchRequest();

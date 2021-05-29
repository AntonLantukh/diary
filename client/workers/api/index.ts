/// <reference lib="webworker" />

import {PUBLIC_ROUTE, API_ROUTE} from 'shared/constants/routes';
import accessTokenManager from './auth';

declare const self: ServiceWorkerGlobalScope;

const CACHE_VERSION = 'v1';

const getCurrentClient = (clientId: string) => self.clients.get(clientId) as Promise<WindowClient | undefined>;

const shouldCache = (request: Request) => !/chrome-extension/.test(request.url) && /img|css/.test(request.url);

const cacheResponse = async (request: Request, response: Response) => {
    const responseClone = response.clone();
    await caches.open(CACHE_VERSION).then(async cache => {
        await cache.put(request, responseClone);
    });
};

const handleTokenError = async (
    originalRequest: Request,
    response: Response,
    client: WindowClient | undefined,
): Promise<Response> => {
    // If access token expired, than try to get a new one via refresh token
    if (response.status === 401) {
        const tokenResponse = await fetch(
            new Request(API_ROUTE.refreshToken, {credentials: 'same-origin', redirect: 'follow'}),
        );

        // If refresh token genretaion failed => go to main
        if (tokenResponse.redirected && client) {
            await client.navigate(PUBLIC_ROUTE.auth);
        }

        // Repeat original request with new access token
        const accesToken = response.headers.get('X-Access-Token');

        if (accesToken) {
            accessTokenManager.setAccessToken(accesToken);
        }

        return fetch(originalRequest);
    }

    if (response.status === 403 && client) {
        await client.navigate(PUBLIC_ROUTE.auth);
    }

    return Promise.resolve(response);
};

const handleResponse = async (res: Response, req: Request, client: WindowClient | undefined): Response => {
    if (!res.ok) {
        return handleTokenError(req, res, client);
    }

    console.log(req, 'req');
    console.log(shouldCache(req), 'shouldCache(req)');
    // if (shouldCache(req)) {
    // await cacheResponse(req, res);
    // }

    if (res.redirected && client) {
        await client.navigate(res.url);
    }

    console.log(res.headers.get('X-Access-Token'), 'res');

    if (req.url === API_ROUTE.signIn || req.url === API_ROUTE.refreshToken) {
        const token = res.headers.get('X-Access-Token');
        accessTokenManager.setAccessToken(token || '');
    }

    console.log(accessTokenManager.getAccessToken());

    return res;
};

const fetchData = (request: Request, client: WindowClient | undefined): Promise<Response> => {
    console.log(request, 'request');
    const signedRequest = new Request(request.url, {
        method: request.method,
        headers: {...request.headers, 'X-Access-Token': accessTokenManager.getAccessToken()},
        mode: request.mode,
        redirect: 'follow',
        body: request.body,
    });

    const originalReq = signedRequest.clone();

    return fetch(signedRequest).then(res => handleResponse(res, originalReq, client));
};

self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    const {request, clientId} = event;

    event.respondWith(
        caches.match(request).then(async response => {
            if (response !== undefined) return response;

            const client = await getCurrentClient(clientId);

            return fetchData(request, client);
        }),
    );
});

export {};

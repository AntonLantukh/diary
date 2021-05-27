/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

const CACHE_VERSION = 'v1';
const REFRESH_TOKEN_URL = '/api/auth/refresh-token';
const AUTH_URL = '/auth';

self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

const shouldCache = (request: Request) => !/chrome-extension/.test(request.url);

const cacheResponse = async (request: Request, response: Response) => {
    const responseClone = response.clone();
    await caches.open(CACHE_VERSION).then(async cache => {
        await cache.put(request, responseClone);
    });
};

const fetchData = (request: Request, client: WindowClient | undefined): Promise<Response> => {
    const originalRequest = request.clone();

    return fetch(request).then(async response => {
        if (!response.ok) {
            return handleTokenError(originalRequest, response, client);
        }

        if (shouldCache(request)) {
            // await cacheResponse(request, response);
        }

        if (response.redirected && client) {
            await client.navigate(response.url);
        }

        return response;
    });
};

async function handleTokenError(
    originalRequest: Request,
    response: Response,
    client: WindowClient | undefined,
): Promise<Response> {
    // If access token expired, than try to get a new one via refresh token
    if (response.status === 401) {
        const tokenResponse = await fetch(
            new Request(REFRESH_TOKEN_URL, {credentials: 'same-origin', redirect: 'follow'}),
        );

        // If refresh token genretaion failed => go to main
        if (tokenResponse.redirected && client) {
            await client.navigate(AUTH_URL);
        }

        // Repeat original request with new access token
        return fetch(originalRequest);
    }

    if (response.status === 403 && client) {
        await client.navigate(AUTH_URL);
    }

    return Promise.resolve(response);
}

self.addEventListener('fetch', event => {
    const {request, clientId} = event;

    event.respondWith(
        // Checking url in caches
        caches.match(request).then(async response => {
            if (response !== undefined) {
                return response;
            }

            const client = (await self.clients.get(clientId)) as WindowClient;

            return fetchData(request, client);
        }),
    );
});

export {};

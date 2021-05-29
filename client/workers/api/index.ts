/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

const CACHE_VERSION = 'v1';

const shouldCache = (request: Request) => !/chrome-extension/.test(request.url) && /img|css/.test(request.url);

const cacheResponse = async (request: Request, response: Response) => {
    const responseClone = response.clone();
    await caches.open(CACHE_VERSION).then(async cache => {
        await cache.put(request, responseClone);
    });
};

const handleResponse = async (req: Request, res: Response): Promise<Response> => {
    if (shouldCache(req)) {
        await cacheResponse(req, res);
    }

    return res;
};

const fetchData = (request: Request): Promise<Response> => {
    return fetch(request).then(response => handleResponse(request, response));
};

self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    const {request} = event;

    event.respondWith(
        caches.match(request).then(async response => {
            if (response !== undefined) return response;

            return fetchData(request);
        }),
    );
});

export {};

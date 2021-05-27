export const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
} as const;

export const CONTENT_TYPE_HEADER = {
    GET: 'application/json',
    POST: 'application/x-www-form-urlencoded',
    PUT: 'application/json',
    DELETE: 'application/json',
} as const;

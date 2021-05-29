import {METHOD} from 'shared/constants/request';

type MethodType = keyof typeof METHOD;
type Params = Record<string, string | number | (string | number)[]>;
type Body = FormData | string | undefined;
type RequestMode = 'cors' | 'no-cors' | 'navigate' | 'same-origin';
type Credentials = 'include' | 'omit' | 'same-origin';

export type ContentType = 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded';

type IncomingConfig = {
    method?: MethodType;
    mode?: RequestMode;
    credentials?: Credentials;
    headers?: {
        'Content-Type'?: ContentType;
        [param: string]: string;
    };
};

export type IncomingRequest = {
    url: string;
    params?: Params;
    config?: IncomingConfig;
};

export type RequestFetchConfig = {
    method: MethodType;
    mode: RequestMode;
    credentials: Credentials;
    body?: Body;
    headers: {
        'Content-Type': ContentType;
        [param: string]: string;
    };
};

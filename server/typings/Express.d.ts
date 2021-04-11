declare namespace Express {
    export interface Request {
        language: string;
        cookies: {
            locale: string;
            'Access-Token'?: string;
            'Refresh-Token'?: string;
        };
        userId: string;
        headers: {
            Authorization: string;
        };
    }
}

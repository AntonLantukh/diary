declare namespace Express {
    export interface Request {
        language: string;
        cookies: {
            locale: string;
        };
        userId: string;
        headers: {
            Authorization: string;
        };
    }
}

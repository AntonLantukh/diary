declare namespace Express {
    export interface Request {
        language: string;
        cookies: {
            locale: string;
        };
    }
}

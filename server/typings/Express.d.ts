import {UserGetDto} from './User';

declare global {
    namespace Express {
        export interface Request {
            language: string;
            cookies: {
                locale: string;
                'Access-Token'?: string;
                'Refresh-Token'?: string;
            };
            userId: string | undefined;
            cspNonce: string;
            user: UserGetDto | null;
            headers: {
                Authorization: string;
            };
        }
    }
}

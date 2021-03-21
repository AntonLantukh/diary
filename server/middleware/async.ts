import {Request, Response, NextFunction} from 'express';

export const handleAsync = (f: (req: Request, res: Response, next: NextFunction) => Promise<void>) => (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    return Promise.resolve(f(req, res, next)).catch(next);
};

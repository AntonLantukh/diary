import {Request, Response, NextFunction} from 'express';

import {logger} from '../logger';

export default (
    {status = 500, message, stack}: Record<string, string | number>,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
): void => {
    logger.error(JSON.stringify({message, stack}));
    res.status(Number(status));
    res.json({
        status: status,
        message: message,
        stack: stack,
    });
};

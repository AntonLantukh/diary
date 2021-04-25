import {Request, Response, NextFunction} from 'express';
import crypto from 'crypto';

const attachCspNone = (req: Request, res: Response, next: NextFunction): void => {
    req.cspNonce = crypto.randomBytes(16).toString('hex');

    next();
};

export default attachCspNone;

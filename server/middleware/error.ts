import {Request, Response, NextFunction} from 'express';

import {logger} from '../logger';

const error = {
    driver: true,
    name: 'MongoError',
    index: 0,
    code: 11000,
    keyPattern: {email: 1},
    keyValue: {email: 'lantukch2an33eton@gmail.com'},
};

type MongoDuplicateKey = {
    driver: boolean;
    name: string;
    index: number;
    code: number;
    keyPattern: Record<string, number | string>;
    keyValue: Record<string, number | string>;
};

const handleDuplicateKeyError = (err: MongoDuplicateKey, res: Response) => {
    const field = (Object.keys(err.keyValue) || [])[0];
    const code = 409;

    res.status(code).send(`An account with that ${field} already exists.`);
};

const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(el => el.message);
    let fields = Object.values(err.errors).map(el => el.path);
    let code = 400;
    if (errors.length > 1) {
        const formattedErrors = errors.join(' ');
        res.status(code).send({messages: formattedErrors, fields: fields});
    } else {
        res.status(code).send({messages: errors, fields: fields});
    }
};

export default (
    err: Record<string, string | number>,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
): void => {
    logger.error(JSON.stringify(err));
    try {
        if (err.name === 'ValidationError') handleValidationError(err, res);
        if (err.code && err.code == 11000) handleDuplicateKeyError(err, res);
    } catch (err) {
        res.status(500).send('An unknown error occurred.');
    }
};

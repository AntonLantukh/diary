import {Request, Response, NextFunction} from 'express';
import {Error} from 'mongoose';

import {ERROR_SUB_TYPE, ERROR_TYPE} from 'shared/constants/error';
import {ServerError, ErrorTypeEnum, RequiredTypeEnum} from 'shared/typings/error';

import {logger} from '../logger';

// MongoDatabase has code field
type ExtendedError = Error & {code: number};

type MongoDuplicateError = {
    driver: boolean;
    name: string;
    index: number;
    code: number;
    keyPattern: Record<string, number | string>;
    keyValue: Record<string, number | string>;
};

const handleDuplicateKeyError = (err: MongoDuplicateError, res: Response) => {
    const code = 409;
    const errors = Object.keys(err.keyValue || []).map(key => ({
        field: key,
        value: err.keyValue[key],
        type: ERROR_SUB_TYPE.DUPLICATE_KEY,
    }));

    const errorObject: ServerError = {
        code,
        type: ERROR_TYPE.VALIDATION_ERROR,
        message: 'Data already exists',
        errors,
    };

    res.status(code).send(errorObject);
};

const handleValidationError = (err: Error.ValidationError, res: Response) => {
    const code = 400;
    const errors = Object.values(err.errors).map(({path, kind, reason, value}) => ({
        field: path,
        value: value as string,
        // @ts-ignore
        type: (reason?.code || ERROR_SUB_TYPE.UNKNOWN) as ErrorTypeEnum,
        requiredKind: kind as RequiredTypeEnum,
    }));

    const errorObject: ServerError = {
        code,
        type: ERROR_TYPE.VALIDATION_ERROR,
        message: err.message,
        errors,
    };

    res.status(code).send(errorObject);
};

export default (
    err: ExtendedError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
): void => {
    logger.error(JSON.stringify(err));
    try {
        if (err.name === 'ValidationError') {
            handleValidationError((err as unknown) as Error.ValidationError, res);
        }
        if (err.code && err.code == 11000) {
            handleDuplicateKeyError((err as unknown) as MongoDuplicateError, res);
        }
    } catch (err) {
        res.status(500).send('An unknown error occurred.');
    }
};

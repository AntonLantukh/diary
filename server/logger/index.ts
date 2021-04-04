import {format, transports, createLogger, TransformableInfo} from 'winston';
import expressWinston from 'express-winston';

const {combine, colorize, timestamp, printf, errors, json} = format;

type TransformableInfo = {
    level: string;
    message: string;
    stack?: string;
    timestamp?: string;
};

const printFormat = (info: TransformableInfo) => {
    const {message, level, stack, timestamp} = info;

    return `${timestamp as string} [${level}]: ${stack || message}`;
};

const formats = combine(colorize(), timestamp(), errors({stack: true}), printf(printFormat));

export const logger = createLogger({
    level: 'info',
    format: formats,
    transports: [new transports.Console({format: formats})],
});

export const routeLogger = expressWinston.logger({
    level: 'info',
    format: json(),
    transports: [new transports.Console({format: formats})],
});

export const errorLogger = expressWinston.errorLogger({
    format: json(),
    transports: [new transports.Console({format: formats})],
});

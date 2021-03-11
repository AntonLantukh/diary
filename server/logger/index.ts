import path from 'path';
import {format, transports, createLogger} from 'winston';
import expressWinston from 'express-winston';

const {combine, colorize, timestamp, printf} = format;
const formats = combine(
    colorize(),
    timestamp(),
    printf(info => `${info.timestamp as string} [${info.level}]: ${info.message}`),
);

export const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [new transports.Console({format: formats})],
});

export const routeLogger = expressWinston.logger({
    level: 'info',
    format: format.json(),
    transports: [new transports.Console({format: formats})],
});

export const errorLogger = expressWinston.errorLogger({
    format: format.json(),
    transports: [new transports.Console({format: formats})],
});

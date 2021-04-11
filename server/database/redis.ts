import redis from 'redis';

import process from 'process';

import {logger} from '../logger';

const redisClient = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
});

redisClient.on('error', err => logger.error(err));
redisClient.on('connect', () =>
    logger.info(`Connection to redis ${process.env.REDIS_HOST}:${process.env.REDIS_PORT} opened`),
);
redisClient.on('ready', () => logger.info(`Redis ready to use`));
redisClient.on('end', () => logger.info(`Redis connection closed`));

process.on('SIGINT', () => {
    redisClient.quit();
});

export default redisClient;

import mongoose from 'mongoose';
import process from 'process';

import {logger} from '../logger';
import config from '../config';

mongoose.Promise = Promise;

const connection = mongoose.createConnection(config.MONGODB_URI, {
    dbName: config.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
});

if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
}

void connection.on('error', err => logger.error(err));
void connection.once('open', () => logger.info(`Connection to ${config.MONGODB_URI} opened`));
void connection.once('connected', () => logger.info(`Connected to database`));
void connection.once('disconnected', () => logger.info(`Connection to database closed`));

// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGINT', async () => {
    await connection.close();
    process.exit(0);
});

export default connection;

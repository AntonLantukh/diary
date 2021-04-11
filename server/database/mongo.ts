import mongoose from 'mongoose';
import process from 'process';

import {logger} from '../logger';

mongoose.Promise = Promise;

const connection = mongoose.createConnection(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
});

if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
}

void connection.on('error', err => logger.error(err));
void connection.once('open', () => logger.info(`Connection to ${process.env.MONGODB_URI} opened`));
void connection.once('connected', () => logger.info(`Connected to mongo database`));
void connection.once('disconnected', () => logger.info(`Connection to mongo database closed`));

// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGINT', async () => {
    await connection.close();
    process.exit(0);
});

export default connection;

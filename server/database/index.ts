import mongoose from 'mongoose';

import {logger} from '../logger';
import config from '../config';

mongoose.Promise = Promise;

const database = mongoose.createConnection(config.mongodb.uri, {useNewUrlParser: true});

if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
}

void database.on('error', err => logger.error(err));
void database.once('open', () => logger.info(process.env.MONGO));

export default database;

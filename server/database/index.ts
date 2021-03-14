import mongoose from 'mongoose';

import {logger} from '../logger';
import config from '../config';

mongoose.Promise = Promise;

const database = mongoose.createConnection(config.mongodb.uri);

void database.on('error', err => logger.error(err));
void database.once('open', () => logger.info(process.env.MONGO));

export default database;

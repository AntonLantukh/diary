import mongoose from 'mongoose';

import {logger} from '../logger';

mongoose.Promise = Promise;

const database = mongoose.createConnection(process.env.MONGO);

void database.on('error', err => logger.error(err));
void database.once('open', () => logger.info(process.env.MONGO));

export default database;

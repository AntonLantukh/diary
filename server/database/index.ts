import mongoose from 'mongoose';

mongoose.Promise = Promise;

void mongoose.connect(process.env.MONGO);

const db = mongoose.connection;

db.on('error', err => console.error(err));
db.once('open', () => console.info(process.env.MONGO));

export default db;

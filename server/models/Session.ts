import {Schema} from 'mongoose';

import database from '../database';

const schema = new Schema({
    token: {
        type: String,
        unique: true,
        required: true,
    },
    lastVisit: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
});

schema.path('lastVisit').index({expires: '7d'});

export default database.model('User', schema);

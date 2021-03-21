import {Schema} from 'mongoose';

import database from '../database';

const schema = new Schema({
    email: {
        type: String,
        index: true,
        trim: true,
        required: 'E-mail should not be blank',
        unique: 'Email already existst',
    },
    name: {
        type: String,
        trim: true,
    },
    surname: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: 'Password should not be blank',
        select: false,
    },
    salt: {
        type: String,
        required: true,
        select: false,
    },
});

export default database.model('User', schema);

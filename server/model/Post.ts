import {Schema} from 'mongoose';
import database from '../database/mongo';

const schema = new Schema({
    title: {
        type: String,
        trim: true,
        required: 'Title should not be blank',
    },
    date: {
        type: Date,
        trim: true,
        required: 'Date should not be blank',
    },
    description: {
        type: String,
        trim: true,
        required: 'Description should not be blank',
    },
});

export default database.model('Post', schema);

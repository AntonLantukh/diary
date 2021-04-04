export default {
    MONGODB_URI: process.env.NODE_ENV === 'development' ? 'mongodb://127.0.0.1:27017' : 'mongodb://127.0.0.1:27017',
    DB_NAME: 'diary',
    crypto: {
        iterations: process.env.NODE_ENV === 'development' ? 1 : 12000,
        length: 128,
        digest: 'sha512',
    },
};

export default {
    mongodb: {
        uri:
            process.env.NODE_ENV === 'development'
                ? 'mongodb://127.0.0.1:27017/diary'
                : 'mongodb://127.0.0.1:27017/diary',
    },
    crypto: {
        iterations: process.env.NODE_ENV === 'test' ? 1 : 12000,
        length: 128,
        digest: 'sha512',
    },
};

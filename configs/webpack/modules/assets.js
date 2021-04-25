const {REG_EXP} = require('../../constants');

const getConfig = (filePath, isServer) => [
    {
        test: REG_EXP.images,
        type: 'asset/resource',
        generator: {
            emit: isServer ? false : true,
            filename: `images/${filePath}`,
        },
    },
    {
        test: REG_EXP.fonts,
        type: 'asset/resource',
        generator: {
            emit: isServer ? false : true,
            filename: `images/${filePath}`,
        },
    },
];

module.exports = {
    client: {
        dev: getConfig('[name][ext]', false),
        prod: getConfig('[name].[contenthash][ext]', false),
    },
    server: {
        dev: getConfig('[name][ext]', true),
        prod: getConfig('[name].[contenthash][ext]', true),
    },
};

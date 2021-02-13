const {REG_EXP} = require('../../constants');

const getConfig = filename => ({
    test: REG_EXP.resources,
    type: 'asset/resource',
    generator: {filename},
});

module.exports = {
    dev: getConfig('static/[name][ext]'),
    prod: getConfig('static/[name].[contenthash][ext]'),
};

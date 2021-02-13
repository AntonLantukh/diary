const {REG_EXP} = require('../../constants');

const BASE_PLUGINS = [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@loadable/babel-plugin',
];

const getConfig = plugins => ({
    test: REG_EXP.js,
    exclude: REG_EXP.node_modules,
    use: {
        loader: 'babel-loader',
        options: {
            plugins: [...(plugins || []), ...BASE_PLUGINS],
            cacheDirectory: true,
        },
    },
});

module.exports = {
    dev: getConfig(['react-hot-loader/babel']),
    prod: getConfig(),
};

const path = require('path');

const nodeExternals = require('webpack-node-externals');

const {babel, css, assets} = require('../modules');
const plugins = require('../plugins');

const {PATHS} = require('../../constants');

module.exports = {
    mode: 'production',
    entry: {
        app: path.join(PATHS.server, 'index.ts'),
    },
    output: {
        filename: 'index.js',
        chunkFilename: 'index.js',
        path: path.join(PATHS.dist, 'server'),
    },
    target: 'node',
    node: {
        __dirname: true,
        __filename: true,
    },
    externals: ['@loadable/component', nodeExternals()],
    resolve: {
        symlinks: false,
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            shared: path.resolve(__dirname, '../../../shared'),
            client: path.resolve(__dirname, '../../../client'),
            server: path.resolve(__dirname, '../../../server'),
            '˜': path.resolve(__dirname, '../../../client'),
            '@': path.resolve(__dirname, '../../../server'),
        },
    },
    devtool: 'source-map',
    module: {
        rules: [css.server.prod, babel.dev, ...assets.server.prod],
    },
    plugins: plugins.server.prod,
};

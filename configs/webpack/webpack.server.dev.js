const path = require('path');

const nodeExternals = require('webpack-node-externals');

const {babel, css} = require('./modules');
const plugins = require('./plugins');

const {PATHS} = require('../constants');

module.exports = {
    mode: 'development',
    entry: {
        app: path.join(PATHS.server, 'index.ts'),
    },
    output: {
        filename: 'server.js',
        chunkFilename: 'server.js',
        path: PATHS.dist,
    },
    target: 'node',
    externals: [nodeExternals()],
    resolve: {
        symlinks: false,
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    devtool: 'source-map',
    module: {
        rules: [css.server.dev, babel.dev],
    },
    plugins: plugins.server.dev,
};

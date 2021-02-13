const path = require('path');

const {assets, css, babel} = require('./modules');
const plugins = require('./plugins');

const {PATHS} = require('../constants');

module.exports = {
    mode: 'production',
    entry: {
        app: path.join(PATHS.client, 'index.tsx'),
    },
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        path: PATHS.dist,
    },
    target: 'web',
    resolve: {
        symlinks: false,
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
        rules: [babel.prod, css.client.prod, assets.prod],
    },
    plugins: plugins.client.prod,
    performance: {
        maxEntrypointSize: 1 * 1024 * 1024, // 1 mb
        maxAssetSize: 1 * 500 * 1024, // 500 kb
    },
    optimization: {
        nodeEnv: 'production',
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            maxAsyncRequests: 10,
            maxInitialRequests: 5,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    minChunks: 1,
                },
                main: {
                    reuseExistingChunk: true,
                    minChunks: 2,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
};

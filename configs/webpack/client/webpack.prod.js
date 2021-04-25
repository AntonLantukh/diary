const path = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const {assets, css, babel} = require('../modules');
const plugins = require('../plugins');

const {PATHS} = require('../../constants');

const serviceWorker = {
    mode: 'production',
    entry: {
        apiServiceWorker: path.resolve(__dirname, '../../../client/workers/api.sw.ts'),
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        globalObject: 'self',
        path: path.join(PATHS.dist, 'client'),
    },
    target: 'webworker',
    module: {
        rules: [babel.dev],
    },
    plugins: plugins.client.sw.prod,
};

const web = {
    mode: 'production',
    entry: {
        main: path.join(PATHS.client, 'index.tsx'),
    },
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        path: path.join(PATHS.dist, 'client'),
    },
    target: 'web',
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
    module: {
        rules: [babel.prod, css.client.prod, ...assets.client.prod],
    },
    plugins: plugins.client.web.prod,
    performance: {
        maxEntrypointSize: 1 * 1024 * 1024, // 1 mb
        maxAssetSize: 1 * 500 * 1024, // 500 kb
    },
    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
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

module.exports = [serviceWorker, web];

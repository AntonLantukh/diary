const path = require('path');

const {assets, css, babel} = require('../modules');
const plugins = require('../plugins');

const {PATHS, REG_EXP} = require('../../constants');

const serviceWorker = {
    mode: 'development',
    entry: {
        apiServiceWorker: path.resolve(__dirname, '../../../client/workers/api.sw.ts'),
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        globalObject: 'self',
        path: path.join(PATHS.dist, 'client'),
    },
    resolve: {
        alias: {
            shared: path.resolve(__dirname, '../../../shared'),
        },
    },
    target: 'webworker',
    module: {
        rules: [babel.dev],
    },
    plugins: plugins.client.sw.dev,
};

const web = {
    mode: 'development',
    entry: {
        main: ['react-hot-loader/patch', path.join(PATHS.client, 'index.tsx')],
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        globalObject: 'self',
        path: path.join(PATHS.dist, 'client'),
    },
    target: 'web',
    resolve: {
        symlinks: false,
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            shared: path.resolve(__dirname, '../../../shared'),
            client: path.resolve(__dirname, '../../../client'),
            server: path.resolve(__dirname, '../../../server'),
            '˜': path.resolve(__dirname, '../../../client'),
            '@': path.resolve(__dirname, '../../../server'),
        },
    },
    devtool: 'source-map',
    module: {
        rules: [babel.dev, css.client.dev, assets.dev],
    },
    plugins: plugins.client.web.dev,
    devServer: {
        host: 'localhost',
        hot: true,
        hotOnly: true,
        contentBase: path.join(PATHS.dist, 'client'),
        compress: true,
        liveReload: false,
        watchContentBase: true,
        progress: true,
        port: 9000,
        writeToDisk: true,
        watchOptions: {
            aggregateTimeout: 3000,
            poll: 8000,
            ignored: REG_EXP.node_modules,
        },
    },
    performance: {
        hints: false,
    },
    optimization: {
        nodeEnv: 'development',
        emitOnErrors: true,
        moduleIds: 'named',
        runtimeChunk: 'single',
        innerGraph: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    minChunks: 1,
                },
            },
        },
    },
};

module.exports = [web, serviceWorker];

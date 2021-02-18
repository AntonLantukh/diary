const path = require('path');

const {assets, css, babel} = require('./modules');
const plugins = require('./plugins');

const {PATHS} = require('../constants');

module.exports = {
    mode: 'development',
    entry: {
        main: path.join(PATHS.client, 'index.tsx'),
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.join(PATHS.dist, 'client'),
    },
    target: 'web',
    resolve: {
        symlinks: false,
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            shared: path.resolve(__dirname, '../../shared'),
            client: path.resolve(__dirname, '../../client'),
            server: path.resolve(__dirname, '../../server'),
            '˜': path.resolve(__dirname, '../../client'),
            '@': path.resolve(__dirname, '../../server'),
        },
    },
    devtool: 'source-map',
    module: {
        rules: [babel.dev, css.client.dev, assets.dev],
    },
    plugins: plugins.client.dev,
    devServer: {
        host: 'localhost',
        contentBase: PATHS.dist,
        compress: true,
        watchContentBase: true,
        progress: true,
        port: 9000,
        hot: true,
    },
    performance: {
        hints: 'warning',
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

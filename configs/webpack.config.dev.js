const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {PATHS} = require('./constants');

const addHash = (template, hash) => `${template}?hash=[${hash}]`;

module.exports = {
    mode: 'development',
    entry: path.join(PATHS.src, 'index.tsx'),
    output: {
        filename: addHash('[name].js', 'contenthash'),
        chunkFilename: addHash('[name].js', 'contenthash'),
        path: PATHS.dist,
    },
    target: 'web',
    resolve: {
        symlinks: false,
        extensions: ['.ts', '.tsx', '.js'],
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            'react-hot-loader/babel',
                            ['@babel/plugin-transform-runtime', {corejs: 3, proposals: true, regenerator: true}],
                        ],
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: PATHS.dist,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                compileType: 'module',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: addHash('[name].js', 'contenthash'),
                },
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.txt/,
                type: 'asset/source',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: addHash('[name].css', 'contenthash'),
            chunkFilename: addHash('[name].css', 'contenthash'),
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(PATHS.src, 'index.html'),
        }),

        new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    ],
    devServer: {
        host: 'localhost',
        contentBase: PATHS.dist,
        compress: true,
        watchContentBase: true,
        progress: true,
        port: 9000,
        hot: true,
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
};

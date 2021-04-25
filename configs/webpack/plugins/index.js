const path = require('path');
const process = require('process');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const {DefinePlugin} = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {ENVIRONMENT} = require('../../constants');
const {PATHS} = require('../../constants');

const getCssPlugin = filename => new MiniCssExtractPlugin({filename, chunkFilename: filename});
const getDefinePlugin = env =>
    new DefinePlugin({
        __IS_BROWSER__: env === ENVIRONMENT.server ? false : true,
        __IS_PRODUCTION__: process.env.NODE_ENV === 'production' ? true : false,
    });

const CLEAN_PLUGIN = new CleanWebpackPlugin({cleanStaleWebpackAssets: false});
const COPY_PLUGIN = new CopyWebpackPlugin({
    patterns: [
        {from: './manifest.json', to: path.join(PATHS.dist, 'client')},
        {from: './assets/icons', to: path.join(PATHS.dist, '/client/icons')},
    ],
});
const LOADABLE_PLUGIN = new LoadablePlugin();

module.exports = {
    client: {
        web: {
            dev: [
                CLEAN_PLUGIN,
                getCssPlugin('[name].css'),
                LOADABLE_PLUGIN,
                COPY_PLUGIN,
                getDefinePlugin(ENVIRONMENT.client),
            ],
            prod: [
                CLEAN_PLUGIN,
                getCssPlugin('[name].[contenthash].css'),
                LOADABLE_PLUGIN,
                COPY_PLUGIN,
                getDefinePlugin(ENVIRONMENT.client),
            ],
        },
        sw: {
            dev: [CLEAN_PLUGIN],
            prod: [CLEAN_PLUGIN],
        },
    },
    server: {
        dev: [CLEAN_PLUGIN, COPY_PLUGIN, getDefinePlugin(ENVIRONMENT.server)],
        prod: [CLEAN_PLUGIN, COPY_PLUGIN, getDefinePlugin(ENVIRONMENT.server)],
    },
};

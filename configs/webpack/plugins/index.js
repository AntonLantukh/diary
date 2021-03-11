const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const {DefinePlugin} = require('webpack');

const {PATHS, ENVIRONMENT} = require('../../constants');

const getCssPlugin = filename => new MiniCssExtractPlugin({filename, chunkFilename: filename});
const getDefinePlugin = env => new DefinePlugin({__IS_BROWSER__: env === ENVIRONMENT.server ? false : true});

const CLEAN_PLUGIN = new CleanWebpackPlugin({cleanStaleWebpackAssets: false});
const LOADABLE_PLUGIN = new LoadablePlugin();
const HTML_PLUGIN = new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(PATHS.client, 'html/index.html'),
});

module.exports = {
    client: {
        dev: [CLEAN_PLUGIN, getCssPlugin('[name].css'), LOADABLE_PLUGIN, getDefinePlugin(ENVIRONMENT.client)],
        prod: [
            CLEAN_PLUGIN,
            getCssPlugin('[name].[contenthash].css'),
            LOADABLE_PLUGIN,
            getDefinePlugin(ENVIRONMENT.client),
        ],
    },
    server: {
        dev: [CLEAN_PLUGIN, getDefinePlugin(ENVIRONMENT.server)],
        prod: [CLEAN_PLUGIN, getDefinePlugin(ENVIRONMENT.server)],
    },
};

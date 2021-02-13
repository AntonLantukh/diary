const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {PATHS} = require('../../constants');

const getCssPlugin = filename => new MiniCssExtractPlugin({filename, chunkFilename: filename});

const CLEAN_PLUGIN = new CleanWebpackPlugin({cleanStaleWebpackAssets: false});
const HTML_PLUGIN = new HtmlWebpackPlugin({filename: 'index.html', template: path.join(PATHS.client, 'index.html')});

module.exports = {
    client: {
        dev: [getCssPlugin('[name].css'), HTML_PLUGIN, CLEAN_PLUGIN],
        prod: [getCssPlugin('[name].[contenthash].css'), CLEAN_PLUGIN],
    },
    server: {
        dev: [CLEAN_PLUGIN],
    },
};

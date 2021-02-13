const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {REG_EXP, PATHS} = require('../../constants');

const CSS_CLIENT_CONFIG = {
    test: REG_EXP.css,
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
};

const CSS_SERVER_CONFIG = {
    test: REG_EXP.css,
    loader: 'null-loader',
};

module.exports = {
    client: {
        dev: CSS_CLIENT_CONFIG,
        prod: CSS_CLIENT_CONFIG,
    },
    server: {
        dev: CSS_SERVER_CONFIG,
        prod: CSS_SERVER_CONFIG,
    },
};

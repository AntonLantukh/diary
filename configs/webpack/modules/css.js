const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {REG_EXP} = require('../../constants');

const MINI_CSS_LOADER = {
    loader: MiniCssExtractPlugin.loader,
    options: {
        publicPath: '/',
    },
};

const POST_CSS_LOADER = {
    loader: 'postcss-loader',
};

const STYLE_LOADER = {
    loader: 'style-loader',
};

const getCssLoader = isServer => ({
    loader: 'css-loader',
    options: {
        modules: {
            compileType: 'module',
            exportOnlyLocals: isServer ? true : false,
        },
    },
});

const CSS_CLIENT_DEV_CONFIG = {
    test: REG_EXP.css,
    use: [STYLE_LOADER, getCssLoader(false), POST_CSS_LOADER],
};

const CSS_CLIENT_PROD_CONFIG = {
    test: REG_EXP.css,
    use: [MINI_CSS_LOADER, getCssLoader(false), POST_CSS_LOADER],
};

const CSS_SERVER_CONFIG = {
    test: REG_EXP.css,
    use: [getCssLoader(true)],
};

module.exports = {
    client: {
        dev: CSS_CLIENT_DEV_CONFIG,
        prod: CSS_CLIENT_PROD_CONFIG,
    },
    server: {
        dev: CSS_SERVER_CONFIG,
        prod: CSS_SERVER_CONFIG,
    },
};

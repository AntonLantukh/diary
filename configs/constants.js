const path = require('path');

const PATHS = {
    client: path.resolve(__dirname, '../client'),
    server: path.resolve(__dirname, '../server'),
    dist: path.resolve(__dirname, '../dist'),
};

const REG_EXP = {
    resources: /\.(?:ico|gif|png|jpg|jpeg|\.woff(2)?|eot|ttf|otf|svg)$/i,
    css: /\.css$/,
    js: /\.(ts|js)x?$/,
    node_modules: /node_modules/,
};

const ENVIRONMENT = {
    server: 'server',
    client: 'client',
};

module.exports = {PATHS, REG_EXP, ENVIRONMENT};

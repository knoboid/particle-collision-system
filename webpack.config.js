const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/sketch.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].js',
        publicPath: '/assets/'
    },
    devServer: {
        port: 8181,
        contentBase: path.join(__dirname, 'dist'),
    }
};

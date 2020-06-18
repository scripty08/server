const merge = require('webpack-merge');
const {HotModuleReplacementPlugin} = require('webpack');
const common = require('./webpack.config.cjs');

const config = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: [
        `webpack-hot-middleware/client?path=/__webpack_hmr`
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    plugins: [
        new HotModuleReplacementPlugin()
    ],
    watchOptions: {
        poll: 1000,
        ignored: ['node_modules', 'public/dist/']
    },
};

module.exports = merge(common, config);

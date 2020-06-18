const path = require('path');
const CLIENT_DIR = path.resolve(__dirname, 'examples/client');
const SRC_CLIENT_DIR = path.resolve(__dirname, 'node_modules/@scripty/app-components/lib/client');

module.exports = {
    entry: [
        CLIENT_DIR + '/index.jsx'
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            '@client': CLIENT_DIR,
            '@src_client': SRC_CLIENT_DIR
        }
    },
    output: {
        publicPath: '/dist/',
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|sass|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    }
};

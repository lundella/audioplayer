const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
    // ,
    // module: {
    //     loaders: [
    //         { test: /\.sass$/, loader: 'style!css!sass' }
    //     ]
    // }
};
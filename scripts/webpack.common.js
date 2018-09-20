const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    mode: 'development',
    context: path.join(process.cwd(), 'src'), //the home directory for webpack
    devtool: 'source-map', // enhance debugging by adding meta info for the browser devtools
    entry: {
        app: './index.js'
    },

    output: {
        path: path.join(process.cwd(), 'build/dist'),
        filename: '[name].[hash].js',
        publicPath: '',
        sourceMapFilename: '[name].map'
    },

    resolve: {
        extensions: ['.js'],  // extensions that are used
        modules: [path.join(process.cwd(), 'src'), 'node_modules'] // directories where to look for modules
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env'],
                    plugins: [
                        "@babel/plugin-proposal-class-properties"
                    ]
                }
            }
        }]
    },
    optimization: {},
    plugins: [
        new CleanWebpackPlugin(['build/dist'], {root: process.cwd()}),
        new HtmlWebpackPlugin({template: path.join(process.cwd() + '/public/index.html')})
    ]
};

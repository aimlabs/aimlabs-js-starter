const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

    mode: 'development',
    context: path.join(process.cwd(), 'src'), //the home directory for webpack
    devtool: 'source-map', // enhance debugging by adding meta info for the browser devtools
    entry: {
        app: './index.js'
    },

    output: {
        path: path.join(process.cwd(), 'build/dist'),
        filename: 'js/[name].[hash].js',
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
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-proposal-export-default-from",
                        "@babel/plugin-proposal-export-namespace-from"
                    ]
                }
            }
        },{
            test: /\.s?css$/,
            use: [{
                loader: 'style-loader'
            },{
                loader : MiniCssExtractPlugin.loader,
                options : {sourceMap: true}
            },{
                loader: "css-loader",
                options  : {sourceMap : true}
            },{
                loader : "sass-loader",
                options  : {sourceMap : true}
            }]
        }]
    },
    optimization: {},
    plugins: [
        new CleanWebpackPlugin(['build/dist'], {root: process.cwd()}),
        new CopyWebpackPlugin([{
            from: '**/*.*'
        }], {
            debug : 'error',
            context : process.cwd() + '/public',
            transform : function (content, path) {
                return content;
            }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].[hash].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({template: path.join(process.cwd() + '/public/index.html')})
    ]
};

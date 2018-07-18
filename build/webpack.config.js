const webpack = require('webpack');
const merge = require('webpack-merge')
const base = require('./webpack.base.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = merge(base, {
    mode: "development",
    devServer: {
        hot: true,
        port: 3000,
        historyApiFallback: true,
        open: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    devtool: 'eval-source-map'
})
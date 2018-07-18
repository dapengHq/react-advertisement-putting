const webpack = require('webpack');
const merge = require('webpack-merge')
const base = require('./webpack.base.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = merge(base,{
    mode: "production",
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    externals:{
        antd:"antd",
        "react":"react",
        "moment":"moment",
        "react-dom":"ReactDOM"
    }
})
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: {
        bundle: path.resolve(process.cwd(), 'src/main.js')
    },
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].[hash].bundle.js',
        publicPath:"/"
    },
    module: {
        rules: [
            //  {
            //      test: /\.(jsx|js)$/,
            //      exclude: /node_modules/,
            //      use: [{
            //          loader: 'babel-loader',
            //          query: {
            //              presets: ['es2015', 'react'],
            //          }
            //      }, ],
            //  },
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css)$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|woff|ttf|svg)$/,
                use: 'file-loader'
            }
        ]
    },
    
    resolve: {
        extensions: ['.jsx', '.js'],
        alias: {
            '@': path.resolve('src')
        }
    },
}
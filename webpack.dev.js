/* eslint-disable */
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["babel-preset-env", "react", "stage-0"],
                            plugins: ["transform-class-properties"]
                        }
                    },
                    {
                        loader: "eslint-loader"
                    }
                ]
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: false,
                            minimize: false
                        }
                    },
                    {
                        loader: "resolve-url-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: false,
                            plugins: () => [require("autoprefixer")]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            }
        ]
    },
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        contentBase: "./",
        port: 9000,
        compress: false
    },
    plugins: []
});

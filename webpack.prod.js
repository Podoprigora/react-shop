/* eslint-disable */
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common, {
  entry: {
    bundle: "./src/index.js"
  },
  output: {
    publicPath: ""
  },
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
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true
              }
            },
            {
              loader: "resolve-url-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [require("autoprefixer")]
              }
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new ExtractTextPlugin({
      filename: "resources/styles.[contenthash:16].css",
      allChunks: true
    }),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
});

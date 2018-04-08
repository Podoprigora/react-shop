/* eslint-disable */
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
  entry: {
    bundle: ["react-hot-loader/patch", "./src/index.js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "react-hot-loader/webpack"
          },
          {
            loader: "babel-loader",
            options: {
              presets: [["babel-preset-env", { modules: false }], "react", "stage-0"],
              plugins: ["react-hot-loader/babel", "transform-class-properties"]
            }
          },
          {
            loader: "eslint-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
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
    compress: false,
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ]
});

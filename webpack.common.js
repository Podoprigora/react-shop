/* eslint-disable */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    bundle: ["babel-polyfill", "./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[hash:16].js",
    sourceMapFilename: "[file].map"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        },
        data: {
          test: /[\\/]data[\\/]/,
          name: "data",
          chunks: "all"
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: "/.json$/",
        exclude: /node_modules/,
        use: [
          {
            loader: "json-loader"
          }
        ]
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        include: /fonts/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "resources/fonts/[hash].[ext]",
              publicPath: "../"
            }
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        exclude: /fonts/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000,
              name: "resources/images/[hash]-[name].[ext]",
              publicPath: "../"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html"
    })
  ]
};

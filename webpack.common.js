/* eslint-disable */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const vendorsLibs = [
  "react",
  "react-dom",
  "prop-types",
  "redux",
  "axios",
  "redux-form",
  "react-router-dom",
  "normalizr",
  "redux-thunk",
  "react-transition-group",
  "react-scrollbar-size",
  "react-event-listener",
  "classnames",
  "dragdealer",
  "money-formatter",
  "normalize-scroll-left",
  "scroll",
  "uuid"
];

module.exports = {
  entry: {
    bundle: ["babel-polyfill", "./src/index.js"],
    vendor: vendorsLibs
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[hash:16].js",
    sourceMapFilename: "[file].map"
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
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"]
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html"
    })
  ]
};

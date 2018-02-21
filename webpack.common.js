/* eslint-disable */
const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
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

const pathToClean = ["dist"];

module.exports = {
  entry: {
    bundle: "./src/index.js",
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
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: "resolve-url-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                plugins: () => [require("autoprefixer")]
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
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
    new ExtractTextPlugin({
      filename: "resources/styles.[contenthash:16].css",
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html"
    })
  ]
};

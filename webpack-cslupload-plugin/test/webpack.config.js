const HtmlPlugin = require("html-webpack-plugin");
const UploadPlugin = require("../index");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
module.exports = () => {
  return {
    mode: "development",
    entry: "./src/index.jsx",
    output: {
      clean: true,
      publicPath: "/",
    },
    resolve: {
      extensions: [".jsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlPlugin({
        template: "./public/index.html",
      }),
      new UploadPlugin({
        baseUrl: "xx",
        url: "xx:222",
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
      }),
    ],
  };
};

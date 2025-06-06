const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "./src/main.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[id].[chunkhash].js",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@/*": path.resolve(__dirname, "src/*"),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: devMode
                  ? "[path][name]__[local]--[hash:base64:5]"
                  : "[hash:base64]",
              },
            },
          },
          { loader: "sass-loader" },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),

  devServer: {
    static: "./dist",
    hot: true,
    port: 3000,
    open: true,
  },
  optimization: {
    runtimeChunk: "single",
  },
  mode: devMode ? "development" : "production",
};

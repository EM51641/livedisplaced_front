const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
  mode: "development",
  entry: {
    home: [
      path.join(
        __dirname,
        "front",
        "src",
        "scripts",
        "pages",
        "home",
        "chart-1.ts"
      ),
      path.join(
        __dirname,
        "front",
        "src",
        "scripts",
        "pages",
        "home",
        "chart-2.ts"
      ),
      path.join(
        __dirname,
        "front",
        "src",
        "scripts",
        "pages",
        "home",
        "chart-3.ts"
      ),
      path.join(
        __dirname,
        "front",
        "src",
        "scripts",
        "pages",
        "home",
        "chart-4.ts"
      ),
    ],
    dashboard: 
      path.join(
        __dirname,
        "front",
        "src",
        "scripts",
        "pages",
        "dashboard",
        "dashboard.ts"
      ),
    reports: [
      path.join(
        __dirname,
        "front",
        "src",
        "scripts",
        "pages",
        "reports",
        "principal-bar.ts"
      ),
      path.join(
        __dirname,
        "front",
        "src",
        "scripts",
        "pages",
        "reports",
        "chart-1.ts"
      ),
      path.join(
        __dirname,
        "front",
        "src",
        "scripts",
        "pages",
        "reports",
        "chart-2.ts"
      ),
      path.join(
        __dirname,
        "front",
        "src",
        "scripts",
        "pages",
        "reports",
        "chart-3.ts"
      ),
      path.join(
        __dirname,
        "front",
        "src",
        "scripts",
        "pages",
        "reports",
        "chart-4.ts"
      ),
      path.join(
        __dirname,
        "front",
        "src",
        "scripts",
        "pages",
        "reports",
        "chart-5.ts"
      ),
    ],
    base: path.join(
      __dirname,
      "front",
      "src",
      "scripts",
      "pages",
      "base",
      "base.ts"
    ),
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          }
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    contentBase: path.join(__dirname, "/dist/"),
    inline: true,
    host: "localhost",
    port: 8080,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/pages/page/base.html",
      filename: "base.html",
      inject: "body",
      chunks: ["base"],
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
    filename: "[name].bundle.js",
    chunkFilename: "[name].js",
  },
};

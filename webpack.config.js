const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    home: [
      path.join( __dirname, "src/Scripts/pages/home/chart-1.ts"),
      path.join( __dirname, "src/Scripts/pages/home/chart-2.ts"),
      path.join( __dirname, "src/Scripts/pages/home/chart-3.ts"),
      path.join( __dirname, "src/Scripts/pages/home/chart-4.ts"),
      path.join( __dirname, "src/pages/home/style.css"),
    ],
    dashboard:[
      path.join( __dirname, "src/Scripts/pages/dashboard/dashboard.ts"),
      path.join(__dirname, "src/pages/dashboard/style.css"),
    ],
    reports: [
      path.join( __dirname, "src/Scripts/pages/reports/principal-bar.ts"),
      path.join( __dirname, "src/Scripts/pages/reports/chart-1.ts"),
      path.join( __dirname, "src/Scripts/pages/reports/chart-2.ts"),
      path.join( __dirname, "src/Scripts/pages/reports/chart-3.ts"),
      path.join( __dirname, "src/Scripts/pages/reports/chart-4.ts"),
      path.join( __dirname, "src/Scripts/pages/reports/chart-5.ts"),
      path.join(__dirname, "src/pages/reports/style.css"),
    ],
    base: [
      path.join( __dirname, "src/Scripts/pages/base/base.ts"),
      path.join(__dirname, "src/pages/base/style.css")
    ],
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css"],
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
      template: "./src/pages/base/base.html",
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

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    login:[
      path.join( __dirname, "src/static/login/style.css"),
    ],
    register:[
      path.join( __dirname, "src/static/register/style.css"),
    ],
    password_lost_rqst:[
      path.join( __dirname, "src/static/password_lost/style.css"),
    ],
    settings:[
      path.join( __dirname, "src/static/settings/style.css"),
    ],
    terms:
    [
      path.join( __dirname, "src/static/terms/style.css"),
    ],
    home: [
      path.join( __dirname, "src/Scripts/pages/home/chart-1.ts"),
      path.join( __dirname, "src/Scripts/pages/home/chart-2.ts"),
      path.join( __dirname, "src/Scripts/pages/home/chart-3.ts"),
      path.join( __dirname, "src/Scripts/pages/home/chart-4.ts"),
      path.join( __dirname, "src/pages/home/style.css"),
    ],
    dashboard:[
      path.join( __dirname, "src/Scripts/pages/dashboard/dashboard.ts"),
      path.join(__dirname, "src/static/dashboard/style.css"),
    ],
    reports: [
      path.join( __dirname, "src/Scripts/pages/reports/principal-bar.ts"),
      path.join( __dirname, "src/Scripts/pages/reports/chart-1.ts"),
      path.join( __dirname, "src/Scripts/pages/reports/chart-2.ts"),
      path.join( __dirname, "src/Scripts/pages/reports/chart-3.ts"),
      path.join( __dirname, "src/Scripts/pages/reports/chart-4.ts"),
      path.join( __dirname, "src/Scripts/pages/reports/chart-5.ts"),
      path.join(__dirname, "src/static/reports/style.css"),
    ],
    base: [
      path.join( __dirname, "src/Scripts/pages/base/base.ts"),
      path.join(__dirname, "src/static/base/style.css")
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
      template: "./src/static/base/base.html",
      filename: "base.html",
      inject: "body",
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      template: "./src/static/dashboard/dashboard.html",
      filename: "dashboard.html",
      inject: "body",
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      template: "./src/static/reports/reports.html",
      filename: "report.html",
      inject: "body",
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      template: "./src/static/home/home.html",
      filename: "home.html",
      inject: "body",
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      template: "./src/static/login/login.html",
      filename: "login.html",
      inject: "body",
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      template: "./src/static/login/login.html",
      filename: "login.html",
      inject: "body",
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      template: "./src/static/register/register.html",
      filename: "register.html",
      inject: "body",
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      template: "./src/static/terms/privacy_policy/privacy_policy.html",
      filename: "privacy_policy.html",
      inject: "body",
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      template: "./src/static/terms/compliance_form/compliance_form.html",
      filename: "compliance_form.html",
      inject: "body",
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      template: "./src/static/terms/terms_of_use/terms_of_use.html",
      filename: "terms_of_use.html",
      inject: "body",
      chunks: [],
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
    filename: "[name].bundle.js",
    chunkFilename: "[name].js",
  },
};

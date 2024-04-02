const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

TEMPLATES_LIST = fs.readdirSync('./src/templates', {withFileTypes: true})
              .filter(item => !item.isDirectory())
              .map(item => item.name);

module.exports = {
  mode: "development",
  entry: {
    login:[
      path.resolve(__dirname, "src/static/css/login.css"),
    ],
    register:[
      path.resolve(__dirname, "src/static/css/register.css"),
    ],
    password_lost_request:[
      path.resolve(__dirname, "src/static/css/password_lost_request.css"),
    ],
    settings:[
      path.resolve(__dirname, "src/static/css/settings.css"),
    ],
    terms:
    [
      path.resolve(__dirname, "src/static/css/compliance_form.css"),
    ],
    home: [
      path.resolve(__dirname, "src/static/ts/home/chart-1.ts"),
      path.resolve(__dirname, "src/static/ts/home/chart-2.ts"),
      path.resolve(__dirname, "src/static/ts/home/chart-3.ts"),
      path.resolve(__dirname, "src/static/ts/home/chart-4.ts"),
      path.resolve(__dirname, "src/static/css/home.css"),
    ],
    dashboard:[
      path.resolve(__dirname, "src/static/ts/dashboard/dashboard.ts"),
      path.resolve(__dirname, "src/static/css/dashboard.css"),
      
    ],
    individual_reports: [
      path.join( __dirname, "src/static/ts/individual_reports/principal-bar.ts"),
      path.join( __dirname, "src/static/ts/individual_reports/chart-1.ts"),
      path.join( __dirname, "src/static/ts/individual_reports/chart-2.ts"),
      path.join( __dirname, "src/static/ts/individual_reports/chart-3.ts"),
      path.join( __dirname, "src/static/ts/individual_reports/chart-4.ts"),
      path.join( __dirname, "src/static/ts/individual_reports/chart-5.ts"),
      path.join(__dirname, "src/static/css/individual_reports.css"),
    ],
    base: [
      path.resolve(__dirname, "src/static/ts/base/base.ts"),
      path.resolve(__dirname, "src/static/css/base.css")
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
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: false,
    port: 9230,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    ...TEMPLATES_LIST.map((filename) => {
      return new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `src/templates/${filename}`),
        filename: filename,
        chunks: [],
      });
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "./dist",
    filename: "[name].bundle.js",
    chunkFilename: "[name].js",
  },
};

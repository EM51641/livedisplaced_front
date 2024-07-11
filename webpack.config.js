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
    update_password:[
      path.resolve(__dirname, "src/static/css/update_password.css"),
    ],
    settings:[
      path.resolve(__dirname, "src/static/css/settings.css"),
    ],
    terms:
    [
      path.resolve(__dirname, "src/static/css/compliance_form.css"),
    ],
    home: [
      path.resolve(__dirname, "src/static/ts/charts/doughnut/top_10_countries_of_arrival.ts"),
      path.resolve(__dirname, "src/static/ts/charts/doughnut/top_10_countries_of_origin.ts"),
      path.resolve(__dirname, "src/static/ts/charts/geo-maps/global_report_geo_chart.ts"),
      path.resolve(__dirname, "src/static/ts/charts/linechart/aggregated_global_displaced_data_charts.ts"),
      path.resolve(__dirname, "src/static/css/home.css"),
    ],
    dashboard:[
      path.resolve(__dirname, "src/static/ts/charts/bilateral/timeserie.ts"),
      path.resolve(__dirname, "src/static/css/dashboard.css"),
      
    ],
    individual_reports: [
      path.resolve(__dirname, "src/static/ts/charts/doughnut/top_10_countries_of_origin_per_country.ts"),
      path.resolve(__dirname, "src/static/ts/charts/doughnut/top_10_countries_of_arrival_per_country.ts"),
      path.resolve(__dirname, "src/static/ts/charts/geo-maps/country_report_geo_chart.ts"),
      path.resolve( __dirname, "src/static/ts/charts/linechart/aggregated_country_displaced_data_origin_chart.ts"),
      path.resolve(__dirname, "src/static/css/individual_reports.css"),
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

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


HTML = [
  "base.html" , "activate_account_email.html",
  "compliance_form.html", "individual_reports.html", 
  "privacy_policy.html", "settings.html",
  "terms_of_use.html", "traffic_between_cntries.html",
  "home.html", "login.html", "password_lost_request.html",
  "register.html", "reset_lost_password_email.html"
]

module.exports = {
  mode: "development",
  entry: {
    login:[
      path.join( __dirname, "src/css/login.css"),
    ],
    register:[
      path.join( __dirname, "src/css/register.css"),
    ],
    password_lost_request:[
      path.join( __dirname, "src/css/password_lost_request.css"),
    ],
    settings:[
      path.join( __dirname, "src/css/settings.css"),
    ],
    terms:
    [
      path.join( __dirname, "src/css/compliance_form.css"),
    ],
    home: [
      path.join( __dirname, "src/ts/home/chart-1.ts"),
      path.join( __dirname, "src/ts/home/chart-2.ts"),
      path.join( __dirname, "src/ts/home/chart-3.ts"),
      path.join( __dirname, "src/ts/home/chart-4.ts"),
      path.join( __dirname, "src/css/home.css"),
    ],
    traffic_between_cntries:[
      path.join( __dirname, "src/ts/traffic_between_cntries/traffic_between_cntries.ts"),
      path.join(__dirname, "src/css/traffic_between_cntries.css"),
      
    ],
    individual_reports: [
      path.join( __dirname, "src/ts/individual_reports/principal-bar.ts"),
      path.join( __dirname, "src/ts/individual_reports/chart-1.ts"),
      path.join( __dirname, "src/ts/individual_reports/chart-2.ts"),
      path.join( __dirname, "src/ts/individual_reports/chart-3.ts"),
      path.join( __dirname, "src/ts/individual_reports/chart-4.ts"),
      path.join( __dirname, "src/ts/individual_reports/chart-5.ts"),
      path.join(__dirname, "src/css/individual_reports.css"),
    ],
    base: [
      path.join( __dirname, "src/ts/base/base.ts"),
      path.join(__dirname, "src/css/base.css")
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
    ...HTML.map((filename) => {
      return new HtmlWebpackPlugin({
        template: `./src/html/${filename}`,
        filename: filename,
        chunks: [],
      });
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
    filename: "[name].bundle.js",
    chunkFilename: "[name].js",
  },
};

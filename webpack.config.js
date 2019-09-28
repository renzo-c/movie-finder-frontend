const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./dist",
    publicPath: "/",
    // watchContentBase: true, // When enabled, file changes will trigger a full page reload.
    // compress: true,
    port: 3000
    // hot: true, // Enable Hot Module Replacement w/o declaring it in script as  --hot
    // historyApiFallback: true //page will likely have to be served in place of any 404 responses.
  }
};

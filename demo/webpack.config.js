const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./app.js",
  output: {
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          loaders: {
            stylus: 'style-loader!css-loader!stylus-loader'
          }
        }
      },
      {
        test: /\.woff$/,
        exclude: /node_modules/,
        loader: 'url-loader'
      }
    ]
  },
  devtool: 'eval',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.template.html'
    })
  ]
}

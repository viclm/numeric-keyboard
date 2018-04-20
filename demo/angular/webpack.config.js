const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./src/polyfills.ts', './src/main.ts'],
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'numeric-keyboard': path.resolve(__dirname, '../../vendor/angular'),
      lib: path.resolve(__dirname, '../../lib')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loaders: ['to-string-loader', 'css-loader', 'stylus-loader']
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
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // if you have anymore problems tweet me at @gdi2290
        // The (\\|\/) piece accounts for path separators for Windows and MacOS
      /(.+)?angular(\\|\/)core(.+)?/,
      path.resolve(__dirname, './src'), // location of your src
      {} // a map of your routes
    ),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}

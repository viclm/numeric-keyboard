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
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.styl$/,
        exclude: [path.resolve('./src/styles.styl')],
        loaders: ['to-string-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.styl$/,
        include: [path.resolve('./src/styles.styl')],
        loaders: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.woff$/,
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

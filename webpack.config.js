const path = require('path')
const webpack = require('webpack')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: "./lib/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue_numeric_keyboard.js',
    library: 'numericKeyboard',
    libraryTarget: 'umd'
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
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
  devtool: false,
  plugins: isProd
    ? [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
        })
      ]
    : []
}

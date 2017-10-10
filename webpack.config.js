const path = require('path')

module.exports = {
  entry: "./lib/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue_numeric_keyboard.js',
    library: 'numericKeyboard',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            stylus: 'style-loader!css-loader!stylus-loader'
          }
        }
      },
      {
        test: /\.woff$/,
        loader: 'url-loader'
      }
    ]
  },
  devtool: false,
  externals: ['vue']
}

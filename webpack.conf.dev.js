const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const babelConfig = require('./babel.conf.js')

function factory(vendor) {

  return {
    mode: 'development',
    entry: `./demo/transfer/${vendor}/index`,
    output: {
      filename: `transfer.${vendor}.js`
    },
    resolve: {
      alias: {
        'vue': 'vue/dist/vue.common.js',
        'lib': path.resolve(__dirname, './lib'),
        'numeric-keyboard': path.resolve(__dirname, `./vendor/${vendor}`)
      },
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules|dist/,
          use: ['awesome-typescript-loader', 'angular2-template-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader', options: babelConfig(vendor) }, 'eslint-loader']
        },
        {
          test: /\.component.styl$/,
          exclude: /node_modules/,
          use: ['to-string-loader', 'css-loader', 'stylus-loader']
        },
        {
          test: /\/\w+(?!\.component\.)\.styl$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'stylus-loader']
        },
        {
          test: /\.woff$/,
          exclude: /node_modules/,
          use: ['url-loader']
        }
      ]
    },
    devtool: 'eval',
    devServer: {
      host: '0.0.0.0',
      port: 4040,
      stats: 'minimal'
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: `${vendor}.html`,
        template: 'demo/transfer/index.template.html',
        meta: { vendor }
      })
    ]
  }

}

module.exports = ['vanilla', 'react', 'vue', 'angular'].map(vendor => factory(vendor))

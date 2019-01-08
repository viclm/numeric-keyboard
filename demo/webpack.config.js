const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = function (env, argv) {
  if (!argv.vendor) {
    console.error('Please run yarn start --vendor <vendor> // "vanilla" | "react" | "vue"')
    process.exit()
  }

  const vendor = argv.vendor

  return {
    mode: 'development',
    entry: `./${vendor}/app.js`,
    output: {
      filename: 'app.js'
    },
    resolve: {
      alias: {
        'numeric-keyboard': path.resolve(__dirname, `../vendor/${vendor}`),
        lib: path.resolve(__dirname, '../lib')
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader'
        },
        {
          test: /\.js(x)?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, '../babel.config.js')
          }
        },
        {
          test: /\.styl(us)?$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'stylus-loader']
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
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: `./${vendor}/index.template.html`
      })
    ]
  }
}

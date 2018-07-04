const path = require('path')
const webpack = require('webpack')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    vanilla: "./vendor/vanilla/index.js",
    react: "./vendor/react/index.js",
    vue: "./vendor/vue/index.js",
    angular: "./vendor/angular/index.ts"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'numeric_keyboard.[name].js',
    library: 'NumericKeyboard',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts'],
    alias: {
      lib: path.resolve(__dirname, 'lib')
    }
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    },
    '@angular/core': {
      root: 'ng',
      commonjs2: '@angular/core',
      commonjs: '@angular/core',
      amd: '@angular/core'
    },
    '@angular/common': {
      root: 'ng',
      commonjs2: '@angular/common',
      commonjs: '@angular/common',
      amd: '@angular/common'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!stylus-loader'
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

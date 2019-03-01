const path = require('path')
const babelConfig = require('./babel.conf.js')

function factory(vendor) {
  
  return {
    mode: 'none',
    entry: `./vendor/${vendor}/index`,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `numeric_keyboard.${vendor}.js`,
      library: 'NumericKeyboard',
      libraryTarget: 'umd2',
      umdNamedDefine: true
    },
    resolve: {
      alias: {
        lib: path.resolve(__dirname, './lib')
      },
      extensions: ['.ts', '.js']
    },
    externals: {
      'vue': {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      },
      'react': {
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
    devtool: false
  }
}

module.exports = ['vanilla', 'react', 'vue', 'angular'].map(vendor => factory(vendor))

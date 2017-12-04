var path = require('path')
var webpack = require('webpack')
var webpackConfig = require('../webpack.config')

delete webpackConfig.entry
delete webpackConfig.output
webpackConfig.devtool = 'inline-source-map'

module.exports = webpackConfig

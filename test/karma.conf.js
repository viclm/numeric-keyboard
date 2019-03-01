const path = require('path')
const webpackConfigs = require('../webpack.conf.build.js')

const webpackConfig = webpackConfigs[0]

delete webpackConfig.entry
delete webpackConfig.output
webpackConfig.devtool = 'inline-source-map'

const browsers = ['PhantomJS']
if (process.env.TRAVIS) {
  if (process.env.TRAVIS_OS_NAME === 'linux') {
    browsers.push('Chrome')
  }
  else if (process.env.TRAVIS_OS_NAME === 'osx') {
    browsers.push('Safari')
  }
}

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'spec/**/*Spec.js'
    ],
    exclude: [
      '**/*.swp'
    ],
    preprocessors: {
      'spec/**/*Spec.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
    autoWatch: true,
    browsers: browsers,
    singleRun: process.env.TRAVIS,
    concurrency: Infinity
  })
}

const path = require('path')
const webpackConfigs = require('../webpack.conf.build.js')

const webpackConfig = webpackConfigs[0]

delete webpackConfig.entry
delete webpackConfig.output
webpackConfig.devtool = 'inline-source-map'

const browsers = []
if (process.env.TRAVIS) {
  if (process.env.TRAVIS_OS_NAME === 'linux') {
    browsers.push('Chrome')
  }
  else if (process.env.TRAVIS_OS_NAME === 'osx') {
    browsers.push('Safari')
  }
}
else {
  browsers.push('ChromeHeadless')
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
    browsers: browsers,
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '--remote-debugging-port=9222',
        ],
      },
    },
    concurrency: Infinity,
    port: 4242,
    singleRun: process.env.TRAVIS,
    autoWatch: !process.env.TRAVIS
  })
}

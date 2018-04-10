// Karma configuration
// Generated on Fri May 26 2017 12:35:30 GMT+0800 (CST)

var webpackConfig = require('./webpack.conf.js')
var browsers = ['PhantomJS']
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

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'spec/**/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
      '**/*.swp'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec/**/*Spec.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: browsers,


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: process.env.TRAVIS,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

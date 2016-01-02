var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    captureTimeout: 60000,
    browserNoActivityTimeout: 60000, // We need to accept that Webpack may take a while to build!
    singleRun: true,
    colors: true,
    frameworks: [ 'mocha', 'sinon', 'chai' ], // Mocha is our testing framework of choice
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack' ] // Preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'mocha' ],
    webpack: { // Simplified Webpack configuration
      module: {
        loaders: webpackConfig.module.loaders
      }
    },
    webpackServer: {
      noInfo: true // We don't want webpack output
    }
  });
};
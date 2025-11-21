const webpackConfig = require('./webpack.test.config.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/**/*.spec.js'
    ],
    preprocessors: {
      'src/**/*.spec.js': ['webpack']
    },
    webpack: webpackConfig,
    reporters: ['progress'],
    browsers: ['Chrome'],
    singleRun: true,
    autoWatch: false
  });
};

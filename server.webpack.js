process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('config');
var webpackConfig = require('./webpack.config');

var host = 'localhost';
var appPort = 3000;
var devServerPort = 3001;

new WebpackDevServer(webpack(webpackConfig), {
  contentBase: [ config.get('buildDirectory'), '/' ].join(''),
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: true,
  hot: true,
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  proxy: {
    '*': 'http://' + host + ':' + appPort
  }
}).listen(devServerPort, host, function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Webpack Dev Server running at ' + host + ':' + devServerPort);
});

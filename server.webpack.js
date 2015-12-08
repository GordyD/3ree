var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var host = 'localhost';
var appPort = 3000;
var devServerPort = 3001;

new WebpackDevServer(webpack(config), {
  contentBase: 'dist/',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    '*': 'http://' + host + ':' + appPort
  },
  noInfo: true,
}).listen(devServerPort, host, function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Webpack Dev Server running at ' + host + ':' + devServerPort);
});

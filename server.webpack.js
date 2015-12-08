var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    '*': 'http://localhost:3000'
  },
  stats: {
    colors: true
  }
}).listen(3001, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Dev server listening at localhost:3001');
});

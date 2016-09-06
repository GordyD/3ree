var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nib = require('nib');

var config = require('config');

var entry, output, plugins, loaders;

if (process.env.NODE_ENV === 'development') {
  entry = [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './client/app'
  ]
  output = {
    path: path.join(__dirname, [ '/', config.get('buildDirectory') ].join('')),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3001/'
  }
  plugins = [
    new webpack.DefinePlugin({ __DEV__: true }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
  loaders = [
    {
      test: /\.js$/,
      loaders: [ 'react-hot', 'babel' ],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.css?$/,
      loaders: [ 'style-loader', 'css-loader' ],
      include: __dirname
    }, {
      test: /\.styl?$/,
      loaders: [ 'style-loader', 'css-loader', 'stylus-loader' ],
      include: __dirname
    }
  ]
} else {
  entry = './client/app'
  output = {
    path: path.join(__dirname, [ '/', config.get('buildDirectory') ].join('')),
    filename: 'bundle.js'
  }
  plugins = [
    new webpack.DefinePlugin({ __DEV__: false, 'process.env.NODE_ENV': '"production"' }),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('style.css'),
    new webpack.NoErrorsPlugin()
  ]
  loaders = [
    {
      test: /\.js$/,
      loaders: [ 'babel' ],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.css?$/,
      loaders: [ ExtractTextPlugin.extract('style-loader', 'css-loader'), 'css-loader' ],
      include: __dirname
    }, {
      test: /\.styl?$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader'),
      include: __dirname
    }
  ]
}

module.exports = {
  devtool: 'source-map',
  entry: entry,
  output: output,
  plugins: plugins,
  module: {
    loaders: loaders
  },
  stylus: {
    use: [ nib() ]
  }
};

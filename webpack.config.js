var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nib = require('nib');

var config = require('config');

var entry, output, plugins, rules;

if (process.env.NODE_ENV !== 'production') {
  entry = [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './client/app',
  ];
  output = {
    path: path.join(__dirname, [ '/', config.get('buildDirectory') ].join('')),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3001/',
  };
  plugins = [
    new webpack.DefinePlugin({ __DEV__: true }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ];
  rules = [
    {
      test: /\.js$/,
      use: [ 'react-hot-loader', 'babel-loader' ],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.css?$/,
      use: [ 'style-loader', 'css-loader' ],
      include: __dirname
    }, {
      test: /\.styl?$/,
      use: [ 'style-loader', 'css-loader', 'stylus-loader' ],
      include: __dirname
    },
  ];
} else {
  entry = './client/app';
  output = {
    path: path.join(__dirname, [ '/', config.get('buildDirectory') ].join('')),
    filename: 'bundle.js'
  };
  plugins = [
    new webpack.DefinePlugin({ __DEV__: false, 'process.env.NODE_ENV': '"production"' }),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.styl$/,
      stylus: {
        default: {
          use: [nib()],
        },
      },
    }),
  ];
  rules = [
    {
      test: /\.js$/,
      use: [ 'babel-loader' ],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.css?$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      }),
      include: __dirname
    }, {
      test: /\.styl?$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'stylus-loader',
        ],
      }),
      include: __dirname,
    }
  ];
}

module.exports = {
  devtool: 'source-map',
  entry: entry,
  output: output,
  plugins: plugins,
  module: {
    rules: rules,
  },
};

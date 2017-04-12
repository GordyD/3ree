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
    filename: '[name].bundle.js',
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
      use: [ 
        'react-hot-loader', 
        { 
          loader: 'babel-loader',
          options: {
            babelrc: false,
            comments: false,
            presets: [
              'es2015',
              'stage-0',
              'react',
              'react-hmre',
            ],
            plugins: [
              'rewire',
            ],
          },
        },
      ],
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
    {
     test: /\.(jpe?g|gif|png)$/,
     use: 'file-loader?emitFile=false&name=[path][name].[ext]'
    }
  ];
} else {
  entry = {
    main: './client/app',
    vendor: [
      'date-fns/distance_in_words',
      'react', 
      'react-dom',
      'react-redux',
      'react-router-redux',
      'react-router',
      'redux-thunk',
      'redux',
      'socket.io-client',
      'superagent'
    ],
  };
  output = {
    path: path.join(__dirname, [ '/', config.get('buildDirectory') ].join('')),
    filename: '[name].bundle.js'
  };
  plugins = [
    new webpack.DefinePlugin({ __DEV__: false, 'process.env.NODE_ENV': "'production'" }),
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: 2,
    }),
  ];
  rules = [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        babelrc: false,
        comments: false,
        presets: [
          'es2015',
          'stage-0',
          'react',
        ],
      },
      exclude: /node_modules/,
      include: __dirname
    }, 
    {
      test: /\.css?$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      }),
      include: __dirname
    }, 
    {
      test: /\.styl?$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'stylus-loader',
        ],
      }),
      include: __dirname,
    },
    {
     test: /\.(jpe?g|gif|png)$/,
     use: 'file-loader?emitFile=false&name=[path][name].[ext]'
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

const SRC = './src';
const DIST = './dist';
const env = process.env;
const path = require('path');

// Config resolved from the NODE_ENV
let resolvedConfig = {};

// The default configuration
// Properties in the default config will be overwritten by the resolved config
let defaultConfig = {
  entry: ['babel-polyfill', path.join(__dirname, SRC, 'index.jsx')],

  output: {
    filename: "[name].[chunkhash].js",
    path: path.join(__dirname, DIST)
  },

  module: {
    rules: [{
      test: /\.html$/,
      loader: 'html-loader'
    },{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['latest', 'react']
        }
      }]
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            {
              loader: 'image-webpack-loader',
              query: {
                imagemin: {
                  bypassOnDebug: true,
                  optimizationLevel: 1,
                  interlaced: false
                }
              }
            }
        ]
    }, {
      test: /\.(eot|woff|woff2|ttf|otf|svg)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]',
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            outputStyle: 'compressed',
            sourceMap: true,
            sourceMapContents: true
          }
        }
      ]
    }]
  },

  resolve: {
    alias: {
      assets: path.join(__dirname, SRC, 'assets'),
      root: path.join(__dirname, SRC)
    },
    extensions: [".js", ".jsx"]
  }
};

// Resolve the specified config from NODE_ENV
switch (env.NODE_ENV) {
  case 'production':
    resolvedConfig = require('./webpack.prod.js');
    break;
  case 'development':
    resolvedConfig = require('./webpack.dev.js');
    break;
  default:
    resolvedConfig = {};
}

// Merge the default config with the resolved config and export it
module.exports = Object.assign({}, defaultConfig, resolvedConfig);
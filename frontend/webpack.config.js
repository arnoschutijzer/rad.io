const SRC = './src';
const DIST = './dist';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: [ 'babel-polyfill', path.join(__dirname, SRC, 'index.jsx') ],

  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, DIST)
  },

  devServer: {
    contentBase: path.join(__dirname, DIST),
    clientLogLevel: 'info',
    port: 3100
  },

  module: {
    rules: [ {
      test: /\.html$/,
      loader: 'html-loader'
    },{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [ {
        loader: 'babel-loader'
      } ]
    }, {
      test: /\.(jpe?g|png|gif|svg|mp3)$/i,
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
      use: [ {
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
    } ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC, 'index.html')
    }),
    new BrowserSyncWebpackPlugin({
      logLevel: 'silent',
      port: 9000,
      proxy: 'http://localhost:3100'
    })
  ],

  resolve: {
    alias: {
      assets: path.join(__dirname, SRC, 'assets'),
      components: path.join(__dirname, SRC, 'components'),
      src: path.join(__dirname, SRC),
      state: path.join(__dirname, SRC, 'state'),
      views: path.join(__dirname, SRC, 'views')
    },
    extensions: [ '.js', '.jsx' ]
  }
};
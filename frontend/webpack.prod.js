const SRC = './src';
const DIST = './dist';
const defaultConfig = require('./webpack.config');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const prodConfig = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC, 'index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons'
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true
    }),
    new CopyWebpackPlugin([ {
      from: path.join(__dirname, SRC, '/assets/fonts'),
      to: path.join(__dirname, DIST, '/assets/fonts')
    } ])
  ]
};

module.exports = Object.assign({}, defaultConfig, prodConfig);

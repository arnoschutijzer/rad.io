const SRC = './src';
const DIST = './dist';
const path = require('path');
// Import build plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const env = process.env;

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC, 'index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env.NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons'
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true
    }),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, SRC, '/assets/fonts'),
      to: path.join(__dirname, DIST, '/assets/fonts')
    }])
  ]
};

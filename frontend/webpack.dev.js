const SRC = './src';
const DIST = './dist';
const path = require('path');
const defaultConfig = require('./webpack.config');
// Import the dashboard UI
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard({
  port: 9000
});
// Import build plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const devConfig = {
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    clientLogLevel: 'info',
    quiet: true,
    port: 3100
  },

  devtool: 'inline-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC, 'index.html')
    }),
    new BrowserSyncWebpackPlugin({
      // Don't show any output from BrowserSync
      logLevel: 'silent',
      port: 9000,
      proxy: 'http://localhost:3100'
    }),
    new CopyWebpackPlugin([ {
      from: path.join(__dirname, SRC, '/assets/fonts'),
      to: path.join(__dirname, DIST, '/assets/fonts')
    } ]),
    new DashboardPlugin(dashboard.setData)
  ]
};

module.exports = Object.assign({}, defaultConfig, devConfig);

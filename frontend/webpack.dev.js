const SRC = './src';
const DIST = './dist';
const PORT = 9000;
const path = require('path');
// Import the dashboard UI
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard({
  port: PORT
});
// Import build plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    clientLogLevel: 'info',
    quiet: true
  },

  devtool: 'inline-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC, 'index.html')
    }),
    new BrowserSyncWebpackPlugin({
      // Don't show any output from BrowserSync
      logLevel: 'silent',
      port: PORT,
      proxy: 'http://localhost:8080'
    }),
    new DashboardPlugin(dashboard.setData)
  ]
};
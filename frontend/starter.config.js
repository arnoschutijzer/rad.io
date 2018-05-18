const path = require('path');
const SRC = './src';

module.exports = () => {
  const webpack = {
    entry: [
      path.resolve(__dirname, SRC, 'index.jsx')
    ],

    resolve: {
      alias: {
        assets: path.join(__dirname, SRC, 'assets'),
        components: path.join(__dirname, SRC, 'components'),
        src: path.join(__dirname, SRC),
        state: path.join(__dirname, SRC, 'state'),
        views: path.join(__dirname, SRC, 'views')
      }  
    }
  };

  return {
    webpack
  };
};

const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    publicPath: `http://localhost:${process.env.DEVELOPMENT_MODULE_PORT ?? 3000}/`,
  },
  devServer: {
    port: process.env.DEVELOPMENT_MODULE_PORT ?? 3000,
    historyApiFallback: true,
    hot: true,
    allowedHosts: ['all'],
  },
};

module.exports = merge(commonConfig, devConfig);

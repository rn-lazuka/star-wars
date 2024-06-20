const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
    path: path.resolve(__dirname, '../build')
  },
  optimization: {
    minimize: true,
    runtimeChunk: false,
  },
};

module.exports = merge(commonConfig, prodConfig);

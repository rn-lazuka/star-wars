const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
require('dotenv').config();
const SRC_PATH = path.join(__dirname, '../src');
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');

const processEnvPlugin = new webpack.DefinePlugin({
  'process.env': JSON.stringify(process.env),
});

const plugins = [
  new HtmlWebpackPlugin({
    template: './public/index.html',
  }),
  processEnvPlugin,
  new ExternalTemplateRemotesPlugin(),
];

module.exports = {
  entry: './src/index',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader',
        include: SRC_PATH,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        issuer: { and: [/\.(js|ts|md)x?$/] },
        type: 'asset/resource',
        include: SRC_PATH,
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  plugins,
};

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
require('dotenv').config();
const SRC_PATH = path.join(__dirname, '../src');
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
const packageJson = require('../package.json');

const processEnvPlugin = new webpack.DefinePlugin({
  APP_VERSION: JSON.stringify(packageJson.version),
  'process.env': JSON.stringify(process.env),
});

const plugins = [
  new HtmlWebpackPlugin({
    template: './public/index.html',
    favicon: './public/favicon.ico',
    manifest: './public/manifest.json',
  }),
  processEnvPlugin,
  new ExternalTemplateRemotesPlugin(),
];

module.exports = {
  entry: './src/index',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        include: [SRC_PATH],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
              '@babel/preset-typescript',
            ],
          },
        },
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
        include: [SRC_PATH],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        issuer: { and: [/\.(js|ts|md)x?$/] },
        type: 'asset/resource',
        include: [SRC_PATH],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@src': path.resolve(SRC_PATH),
      '@components': path.resolve(SRC_PATH, 'components'),
      '@utils': path.resolve(SRC_PATH, 'utils'),
      '@store': path.resolve(SRC_PATH, 'store'),
      '@sagas': path.resolve(SRC_PATH, 'sagas'),
      '@pages': path.resolve(SRC_PATH, 'pages'),
      '@containers': path.resolve(SRC_PATH, 'containers'),
      '@hooks': path.resolve(SRC_PATH, 'hooks'),
      '@assets': path.resolve(SRC_PATH, 'assets'),
      '@constants': path.resolve(SRC_PATH, 'constants'),
      '@enums': path.resolve(SRC_PATH, 'enums'),
      '@types': path.resolve(SRC_PATH, 'types'),
    },
  },
  plugins,
};

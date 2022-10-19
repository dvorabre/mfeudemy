const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');


const prodConfig = {
  mode: 'production',
  output:{
    filename: '[name].[contenthash].js',
    publicPath: '/auth/latest/', // where to save the files
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap.js'
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, prodConfig);
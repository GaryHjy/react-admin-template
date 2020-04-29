const merge = require('webpack-merge');
const utils = require('./utils');
const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');

const config = {
  'development': devConfig,
  'production': prodConfig
}
const isDev = utils.appEnv.NODE_ENV === 'development';

const baseConfig = {
  entry: utils.appIndex,
  output: {
    pathinfo: isDev, // bundle中引入所包含模块信息的相关注释
    filename: isDev ? 'static/js/bundle.js' : 'static/js/[name].[chunkhash:8].js',
    path: utils.appBuild,
    publicPath: !isDev ? utils.publicPath : undefined,
    chunkFilename: isDev ? 'static/js/[name].chunk.js' : 'static/js/[name].[contenthash:8].chunk.js'
  },
}

module.exports = merge(baseConfig, config[utils.appEnv.NODE_ENV])

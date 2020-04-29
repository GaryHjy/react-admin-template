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
    pathinfo: isDev,
    filename: isDev ? 'static/js/bundle.js' : 'static/js/[name][chunkhash:8].js',
    path: utils.appBuild,
    publicPath: !isDev ? utils.publicPath : undefined
  },
}

module.exports = merge(baseConfig, config[utils.appEnv.NODE_ENV])

const merge = require('webpack-merge');
const utils = require('./utils');
const getStyleLoaders = require('./utils').getStyleLoaders;
const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');

const config = {
  'development': devConfig,
  'production': prodConfig
}
const isDev = utils.appEnv.NODE_ENV === 'development';

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

const baseConfig = {
  entry: utils.appIndex,
  output: {
    pathinfo: isDev, // bundle中引入所包含模块信息的相关注释
    filename: isDev ? 'static/js/bundle.js' : 'static/js/[name].[chunkhash:8].js',
    path: utils.appBuild,
    publicPath: !isDev ? utils.publicPath : undefined,
    chunkFilename: isDev ? 'static/js/[name].chunk.js' : 'static/js/[name].[contenthash:8].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: require.resolve('babel-loader')
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1, // 在一个css中引入了另一个css也会执行之前两个loader
          sourceMap: !isDev,
        }),
        sideEffects: true,
      },
      {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 2,
            sourceMap: !isDev
          },
          'less-loader'
        ),
        sideEffects: true
      },
    ]
  }
}

module.exports = merge(baseConfig, config[utils.appEnv.NODE_ENV])

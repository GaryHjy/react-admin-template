const merge = require('webpack-merge');
const paths = require('./paths');
const { getStyleLoaders, getCSSModuleLocalIdent} = require('./utils');
const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');

const config = {
  'development': devConfig,
  'production': prodConfig
}
const isDev = paths.appEnv.NODE_ENV === 'development';

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

const baseConfig = {
  entry: paths.appIndex,
  output: {
    pathinfo: isDev, // bundle中引入所包含模块信息的相关注释
    filename: isDev ? 'static/js/bundle.js' : 'static/js/[name].[chunkhash:8].js',
    path: paths.appBuild,
    publicPath: !isDev ? paths.publicPath : undefined,
    chunkFilename: isDev ? 'static/js/[name].chunk.js' : 'static/js/[name].[contenthash:8].chunk.js'
  },
  resolve: {
    // 配置模块扩展名
    extensions: ['.js', '.jsx', '.json', '.css', '.less'],
  },
  module: {
    rules: [
      { parser: { requireEnsure: false } },  // 禁用 require.ensure
      {
        // 数组，当规则匹配时，只使用第一个匹配规则。
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: '10000',
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              compact: !isDev,
            }
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
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              modules: {
                getLocalIdent: getCSSModuleLocalIdent
              }
            })
          },
          {
            test: lessRegex,
            exclude: lessModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: !isDev,
              },
              'less-loader'
            ),
            sideEffects: true
          },
          {
            test: lessModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                modules: {
                  getLocalIdent: getCSSModuleLocalIdent
                }
              },
              'less-loader'
            )
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          }
        ]
      }
    ]
  }
}

module.exports = merge(baseConfig, config[paths.appEnv.NODE_ENV])

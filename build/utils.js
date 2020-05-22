const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const loaderUtils = require('loader-utils');
const paths = require('./paths');
const isDev = paths.appEnv.MODE === 'dev';
const publicPath = paths.publicPath;

/**
 * @description 获取styleLoader配置
 * @param {object} cssOptions css-loader配置
 * @param {string} preProcessor 预处理器loader
 */
const getStyleLoaders = function (cssOptions, preProcessor) {
  const loaders = [
    isDev && require.resolve('style-loader'),
    !isDev && {
      loader: MiniCssExtractPlugin.loader,
      options: publicPath.startsWith('.')
        ? { publicPath: '../../' }
        : {},
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: !isDev
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
          lessOptions: {
            javascriptEnabled: true
          }
        },
      }
    );
  }
  return loaders;
}

/**
 * @description css模块化命名规则
 */
const getCSSModuleLocalIdent = function (context, localIdentName, localName, options) {
  // 获取文件所在的文件夹名
  const fileNameOrFolder = context.resourcePath.match(
    /index\.module\.(css|less)$/
  )
    ? '[folder]'
    : '[name]';

  const hash = loaderUtils.getHashDigest(
    path.posix.relative(context.rootContext, context.resourcePath) + localName,
    'md5',
    'base64',
    5
  );
  const className = loaderUtils.interpolateName(
    context,
    fileNameOrFolder + '_' + localName + '__' + hash,
    options
  );
  return className.replace('.module_', '_');
}

module.exports = {
  getStyleLoaders,
  getCSSModuleLocalIdent
}

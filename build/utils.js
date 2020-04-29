const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('dotenv').config();

['NODE_ENV', 'API_SERVER', 'PUBLIC_PATH'].forEach(key => {
  console.log('\n%s\t: %s\n', key, process.env[key])
})

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);
const publicPath = process.env.PUBLIC_PATH || './'
const isDev = process.env.NODE_ENV === 'development';

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
        },
      }
    );
  }
  return loaders;
}

module.exports = {
  appEnv: process.env,
  appSrc: resolvePath('src'),
  appIndex: resolvePath('src/index.js'),
  appBuild: resolvePath('dist'),
  appHtml: resolvePath('public/index.html'),
  proxy: resolvePath('config/proxy.config.js'),
  mockServer: resolvePath('config/mock.js'),
  publicPath,
  getStyleLoaders
}

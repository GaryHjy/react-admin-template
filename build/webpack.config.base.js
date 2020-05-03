const os = require('os');
const merge = require('webpack-merge');
const paths = require('./paths');
const { getStyleLoaders, getCSSModuleLocalIdent} = require('./utils');
const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HappyPack = require('happypack');


// 进程数由CPU核数决定
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

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
    modules: ['node_modules', paths.appNodeModules],
    // 配置模块扩展名
    extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    // 配置模块别名或目录别名    
    alias: {
      '@': paths.appSrc
    }
  },
  module: {
    rules: [
      { parser: { requireEnsure: false } },  // 禁用 require.ensure
      {
        // 数组，当规则匹配时，只使用第一个匹配规则。
        oneOf: [
          {
            test: [/\.(bmp|gif|jpe?g|png)$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10240, // 10kb = 10 * 1024BYTE
              name: 'static/assets/[name].[hash:8].[ext]',
            },
          },
          // 处理字体文件
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: require.resolve('url-loader'),
            options: {
              limit: 10240,
              name: 'static/assets/fonts/[name].[hash:8].[ext]'
            }
          },
          {
            test: /\.(js|jsx)$/,
            include: paths.appSrc,
            loader: 'happypack/loader',
            options: {
              cacheDirectory: true,
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
  },
  plugins: [
    // 拷贝public下文件,除了.html文件
    new CopyWebpackPlugin([{
      from: paths.appPublic,
      to: paths.appBuild,
      ignore: ['*.html']
    }]),
    // js多进程构建
    new HappyPack({
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'babel-loader',
      }],
    })
  ],
  optimization: {
    minimize: !isDev,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: process.env.npm_config_report,
          keep_fnames: process.env.npm_config_report,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        sourceMap: !isDev,
        parallel: 4, // 开启多进程打包
        cache: true // 缓存
      }),
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(le|c)ss$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
}

module.exports = merge(baseConfig, config[paths.appEnv.NODE_ENV])

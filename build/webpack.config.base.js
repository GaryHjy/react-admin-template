const os = require('os');
const webpack = require('webpack');
const merge = require('webpack-merge');
const paths = require('./paths');
const { getStyleLoaders, getCSSModuleLocalIdent } = require('./utils');
const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const PurgeCssPlugin = require('purgecss-webpack-plugin');
const WebpackBar = require('webpackbar');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const glob = require('glob');

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
      isDev && {
        test: /\.jsx?$/,
        loader: require.resolve('eslint-loader'),
        options: {
          cache: true
        },
        enforce: "pre",
        include: [paths.appSrc], // 指定检查的目录 
        exclude: paths.appNodeModules,
      },
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
            exclude: paths.appNodeModules,
            use: [
              {
                loader: 'thread-loader',
                options: {
                  workers: 3, // 开启几个 worker 进程来处理打包，默认是 os.cpus().length - 1
                }
              },
              {
                loader: require.resolve('babel-loader'),
                options: {
                  cacheDirectory: true,
                }
              }
            ]
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1, // 在一个css中引入了另一个css也会执行之前两个loader
              sourceMap: !isDev
            }),
            sideEffects: true
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
            include: [paths.appSrc],
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
    ].filter(Boolean)
  },
  plugins: [
    // 拷贝public下文件,除了.html文件
    new CopyWebpackPlugin([{
      from: paths.appPublic,
      to: paths.appBuild,
      ignore: ['*.html']
    }]),
    // 过滤moment中的locale文件，避免打包进去
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // 模块提供一个中间的缓存
    new HardSourceWebpackPlugin(),
    new PurgeCssPlugin({
      paths: glob.sync(`${paths.appSrc}/**/*`, { nodir: true }),
    }),
    // 生成编译结果的资源单
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: paths.appPublic,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter(
          fileName => !fileName.endsWith('.map')
        );
        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    }),
    // 进度条
    new WebpackBar({
      name: isDev ? 'client' : 'build',
      color: 'blue',
      profile: false,
      reporters: [
        'basic',
        'fancy',
        'profile',
        'stats'
      ],
      stats: !isDev, // 打包信息prod时显示
      reporter: {
        change: (_, { shortPath }) => {
          if (isDev) {
            console.log('bundler:change', shortPath)
          }
        }
      }
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
      chunks: 'all',
      name: false,
      cacheGroups: {
        vendor: {
          chunks: "all",
          test: /node_modules/,
          name: "vendor",
          minChunks: 1, // 最小公用次数
          maxInitialRequests: 5,
          minSize: 0, //表示在压缩前的最小模块大小,默认值是 30kb
          priority: 100, // 优先级
        },
        common: {
          chunks: "all",
          test: /[\\/]src[\\/]js[\\/]/,
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 60
        },
        styles: {
          name: 'styles',
          test: /\.(le|c)ss$/,
          chunks: 'all',
          enforce: true
        },
        runtimeChunk: {
          name: 'runtime'
        }
      }
    }
  },
  stats: 'errors-only',
  performance: {
    maxEntrypointSize: 1000 * 1024,
    hints: isDev ? false : 'warning'
  }
}

module.exports = merge(baseConfig, config[paths.appEnv.NODE_ENV])

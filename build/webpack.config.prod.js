const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = {
  mode: 'production',
  devtool: 'none',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      inject: true, // js插入的位置
      minify: {
        collapseWhitespace: true, // 折叠构成文档树中的文本节点的空白
        removeComments: true, // 带HTML注释
        removeStyleLinkTypeAttributes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        keepClosingSlash: true,
        minifyJS: true, // 压缩css
        minifyCSS: true,// 压缩js
        minifyURLs: true,
      }
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: '//cdn.jsdelivr.net/npm/react@16.13.0/umd/react.production.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: '//cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js',
          global: 'ReactDOM',
        },
      ]
    }),
    process.env.npm_config_report && new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
      logLevel: 'info'
    })
  ].filter(Boolean)
}
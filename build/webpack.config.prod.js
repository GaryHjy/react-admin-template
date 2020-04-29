const utils = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'none',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: utils.appHtml,
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
    })
  ]
}
const webpack = require('webpack');
const utils = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const proxyConfig = require(utils.proxy);
const mockServer = require(utils.mockServer);

const host = utils.appEnv.HOST || '0.0.0.0';

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: utils.appBuild,
    compress: true, // 开启gzip压缩
    hot: true, // 开启热替换
    watchContentBase: true, // 文件修改之后，会触发一次完整的页面重载
    publicPath: '/', // 上下文path
    quiet: true, // 初始启动信息之外的任何内容都不会被打印到控制台, webpack的错误或警告在控制台不可见
    watchOptions: {
      ignored: ['node_modules'], // 排除监听一些巨大的文件夹
    },
    host, // 指定host
    overlay: false, // 全屏显示编译器错误或警告的信息
    progress: true, // 将运行进度输出到控制台
    before: mockServer, // 利用before写mock接口
    proxy: proxyConfig, // 代理配置
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 开启HMR
    new HtmlWebpackPlugin({
      template: utils.appHtml,
      inject: true, // js插入的位置
    })
  ]
}
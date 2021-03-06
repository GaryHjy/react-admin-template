const webpack = require('webpack');
const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const proxyConfig = require(paths.proxy);
const mockServer = require(paths.mockServer);

const host = paths.appEnv.HOST || '0.0.0.0';

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: paths.appBuild,
    compress: true, // 开启gzip压缩
    hot: true, // 开启热替换
    watchContentBase: true, // 文件修改之后，会触发一次完整的页面重载
    publicPath: '/', // 上下文path
    quiet: false, // 初始启动信息之外的任何内容都不会被打印到控制台, webpack的错误或警告在控制台不可见
    watchOptions: {
      ignored: [paths.appNodeModules], // 排除监听一些巨大的文件夹
    },
    host, // 指定host
    hotOnly: false, // 浏览器不自动刷新，就开启hotOnly
    overlay: true, // 全屏显示编译器错误或警告的信息
    progress: false, // 将运行进度输出到控制台
    before: mockServer, // 利用before写mock接口
    proxy: proxyConfig, // 代理配置
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 开启HMR
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      inject: true, // js插入的位置
    }),
    // 开启 Scope Hoisting
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
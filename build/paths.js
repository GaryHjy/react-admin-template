const fs = require('fs');
const path = require('path');
require('dotenv').config();

['MODE', 'API_SERVER', 'PUBLIC_PATH'].forEach(key => {
  console.log('\n%s\t: %s\n', key, process.env[key])
})

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);
const publicPath = process.env.PUBLIC_PATH || './'

module.exports = {
  appEnv: process.env,
  appSrc: resolvePath('src'),
  appComponents: resolvePath('src/components'),
  appIndex: resolvePath('src/index.js'),
  appBuild: resolvePath('dist'),
  appHtml: resolvePath('public/index.html'),
  appPublic: resolvePath('public'),
  proxy: resolvePath('config/proxy.config.js'),
  mockServer: resolvePath('config/mock.js'),
  appNodeModules: resolvePath('node_modules'),
  publicPath
}

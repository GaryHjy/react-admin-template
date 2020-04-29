const fs = require('fs');
const path = require('path');
require('dotenv').config();

['NODE_ENV', 'API_SERVER', 'PUBLIC_PATH'].forEach(key => {
  console.log('\n%s\t: %s\n', key, process.env[key])
})

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);
const publicPath = process.env.PUBLIC_PATH || './'

module.exports = {
  appEnv: process.env,
  appIndex: resolvePath('src/index.js'),
  appBuild: resolvePath('dist'),
  appHtml: resolvePath('public/index.html'),
  proxy: require(resolvePath('config/proxy.config.js')),
  publicPath
}

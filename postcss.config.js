const glob = require('glob');
const paths = require('./build/paths');

module.exports = ({ env }) => ({
  plugins: {
    'postcss-import': {},
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009', // 兼容性
      },
      stage: 3,
    },
    // 擦除无用css
    '@fullhuman/postcss-purgecss': {
      content: [paths.appHtml, ...glob.sync(`${paths.appSrc}/**/*.{js,jsx}`, { nodir: true })],
      whitelistPatterns: [/^ant/], // 正则过滤类名
    },
    cssnano: env === 'production' ? {} : false, // css压缩
  },
});

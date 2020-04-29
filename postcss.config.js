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
    'cssnano': env === 'production' ? {} : false, // css压缩
  }
})
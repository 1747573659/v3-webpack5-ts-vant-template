const { defineConfig } = require('@vue/cli-service')
const IS_PROD = ['production'].includes(process.env.NODE_ENV)

// 将默认的document.title设置为登录，避免第一次进入的时候产生document.title抖动
const PROJECT_NAME = '登录'

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  productionSourceMap: false,
  outputDir: 'xdd-wallet-h5',
  devServer: {
    port: 80,
    open: false
  },
  css: {
    extract: IS_PROD, // 是否使用css分离插件
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/_global.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = PROJECT_NAME;
      return args;
  })
  }
})

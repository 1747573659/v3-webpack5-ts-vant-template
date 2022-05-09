const { defineConfig } = require('@vue/cli-service')
const IS_PROD = ['production'].includes(process.env.NODE_ENV)

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
  }
})

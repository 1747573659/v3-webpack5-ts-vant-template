const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  productionSourceMap: false,
  outputDir: 'xdd-wallet-h5',
  devServer: {
    port: 80,
    open: false
  }
})

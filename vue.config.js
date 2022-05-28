const { defineConfig } = require('@vue/cli-service')
const IS_PROD = ['production'].includes(process.env.NODE_ENV)
const webpack = require('webpack')
const VConsolePlugin = require('vconsole-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 将默认的document.title设置为登录，避免第一次进入的时候产生document.title抖动
const PROJECT_NAME = '登录'

console.log('<----------------->')
console.log('当前打包环境: ' + process.env.VUE_APP_FLAG)
console.log('当前打包API: ' + process.env.VUE_APP_BASE_API)
console.log('<----------------->')

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
        additionalData: `@import "@/assets/styles/theme/index.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = PROJECT_NAME;
      return args;
    })
    config.plugins.delete('prefetch').delete('preload')
    config.optimization.splitChunks({
      cacheGroups: {
        libs: {
          name: 'chunk-vendor',
          chunks: 'initial',
          minChunks: 1,
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
          reuseExistingChunk: true,
          enforce: true
        },
        common: {
          name: 'chunk-common',
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 2,
          reuseExistingChunk: true,
          enforce: true
        },
        vue: {
          name: 'chunk-vue',
          test: /[\\/]node_modules[\\/](vue|vue-router|vuex)[\\/]/,
          chunks: 'all',
          priority: 3,
          reuseExistingChunk: true,
          enforce: true
        },
        vant: {
          name: 'chunk-vant',
          test: /[\\/]node_modules[\\/]vant[\\/]/,
          chunks: 'all',
          priority: 3,
          reuseExistingChunk: true,
          enforce: true
        },
        moment: {
          name: 'chunk-moment',
          test: /[\\/]node_modules[\\/]moment[\\/]/,
          chunks: 'all',
          priority: 3,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    })
  },
  configureWebpack: config => {
    // 仅在测试环境打包环境运行
    if (process.env.NODE_ENV === 'production' && (process.env.VUE_APP_FLAG !== 'pro')) {
      const vConsole = [
        // 移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
        new VConsolePlugin({
          filter: [],
          enable: true
        })
      ]

      config.plugins = [...config.plugins, ...vConsole]
    }
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ]
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.js$|\.css/, // 匹配文件名
          threshold: 10240, // 对超过10k数据进行压缩
          minRatio: 0.8,
          deleteOriginalAssets: false // 是否删除源文件
        })
      )
      config.plugins.push(new webpack.IgnorePlugin({resourceRegExp: /\.\/locale$/, contextRegExp: /moment$/}))
    }
  }
})

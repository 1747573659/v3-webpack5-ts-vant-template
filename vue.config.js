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

    // 默认配置
    // optimization: {
    //   splitChunks: {
    // 在cacheGroups外层的属性设定适用于所有缓存组，不过每个缓存组内部可以重设这些属性
    //     chunks: "async", //将什么类型的代码块用于分割，三选一： "initial"：入口代码块 | "all"：全部 | "async"：按需加载的代码块
    //     minSize: 30000, //大小超过30kb的模块才会被提取
    //     maxSize: 0, //只是提示，可以被违反，会尽量将chunk分的比maxSize小，当设为0代表能分则分，分不了不会强制
    //     minChunks: 1, //某个模块至少被多少代码块引用，才会被提取成新的chunk
    //     maxAsyncRequests: 5, //分割后，按需加载的代码块最多允许的并行请求数，在webpack5里默认值变为6
    //     maxInitialRequests: 3, //分割后，入口代码块最多允许的并行请求数，在webpack5里默认值变为4
    //     automaticNameDelimiter: "~", //代码块命名分割符
    //     name: true, //每个缓存组打包得到的代码块的名称
    //     cacheGroups: {
    //       vendors: {
    //         test: /[\\/]node_modules[\\/]/, //匹配node_modules中的模块
    //         priority: -10, //优先级，当模块同时命中多个缓存组的规则时，分配到优先级高的缓存组
    //       },
    //       default: {
    //         minChunks: 2, //覆盖外层的全局属性
    //         priority: -20,
    //         reuseExistingChunk: true, //是否复用已经从原代码块中分割出来的模块
    //       },
    //     },
    //   },
    // },

    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: 'chunk-vendor',
          chunks: 'initial',
          minChunks: 1,
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
          reuseExistingChunk: true,
          enforce: true
        },
        commons: {
          name: 'chunk-common',
          chunks: 'initial',
          minChunks: 2, // 被两个模块应用
          maxInitialRequests: 3, // 分割后，入口代码块最多允许的并行请求数为5
          minSize: 30000, // 超过30kb就被提取
          priority: 2,
          reuseExistingChunk: true,
          enforce: true
        },
        // 由于单个vue和vant都比较小，所以可以放在一起
        vueandvant: {
          name: 'chunk-vueandvant',
          test: /[\\/]node_modules[\\/](vue|vue-router|vuex|vant)[\\/]/,
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
      // 去掉moment的国际化的相关的内容
      config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /\.\/locale$/, contextRegExp: /moment$/ }))
    }
  }
})

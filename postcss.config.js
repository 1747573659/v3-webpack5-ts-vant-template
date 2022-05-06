module.exports = ({ file }) => {
  let remUnit
  // 判断条件
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    remUnit = 37.5
  } else {
    remUnit = 75
  }
  return {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: [
          'Android 4.1',
          'iOS 7.1',
          'Chrome > 31',
          'ff > 31',
          'ie >= 8'
        ]
      },
      'postcss-pxtorem': {  
        rootValue: remUnit, // 结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
        propList: ['*']
      }
    }
  }
}

module.exports = ({ file }) => {
  let remUnit = 37.5
  // 如果UI的设计稿的宽为750px
  if (file && file.indexOf('\\vant\\') > -1) {
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
        rootValue: remUnit,
        propList: ['*']
      }
    }
  }
}

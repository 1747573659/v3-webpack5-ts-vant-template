
import Request from './request'
import type { RequestConfig } from './types'
import { Toast, Dialog } from 'vant'
import errorCode from './errorCode'
import store from '@/store/index'
import router from '@/router'

const request = new Request({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false, // 跨域请求时是否需要凭证
  timeout: 1000 * 60,
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => {
      const token = store.getters.token
      if (token) {
        config.headers && (config.headers['token'] = token)
      }
      return config
    },
    // 响应拦截器
    responseInterceptors: <T>(result: MyResponse<T>): T | any => {
      if (!errorCode.includes(result.code)) {
        if (result.code === 0) {
          return result.data
        } else {
          return result.msg
        }
      } else if (result.code === 190001) {
        // token过期
        Dialog.alert({
          message: result.msg,
          confirmButtonColor: '#00A3FF',
          cancelButtonColor: '#00A3FF',
          className: 'wallet-dialog',
        }).then(() => {
          router.replace('login')
        })
        return Promise.reject(result)
      } else {
        // 常规错误
        Toast.fail(result.msg);
        return Promise.reject(result)
      }
    }
  },
})

interface MyRequestConfig<T> extends RequestConfig {
  data?: T
}

interface MyResponse<T> {
  code: number,
  msg: string,
  data: T,
  resultCode: string,
  success: boolean
}

const myRequest = <D, T>(config: MyRequestConfig<D>) => {
  return request.request<T>(config)
}

export default myRequest
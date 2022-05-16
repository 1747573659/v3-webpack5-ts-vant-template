/*
 * @Date         : 2022-05-06 11:02:27
 * @LastEditors  : 庄鸿斌
 * @LastEditTime : 2022-05-16 14:47:12
 */
import Request from './request'
import type { RequestConfig } from './types'
import { Toast } from 'vant'

const request = new Request({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false, // 跨域请求时是否需要凭证
  timeout: 1000 * 60,
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => {
      return config
    },
    // 响应拦截器
    responseInterceptors: <T>(result: MyResponse<T>): T => {
      if (result.code === 0) {
        return result.data
      } else {
        return Toast.fail(result.msg);
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
  return request.request<MyResponse<T>>(config)
}

export default myRequest
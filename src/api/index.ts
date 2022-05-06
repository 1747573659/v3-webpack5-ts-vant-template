import Request from './request'
import type { RequestConfig } from './types'

const request = new Request({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false, // 跨域请求时是否需要凭证
  timeout: 1000 * 60,
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => {
      console.log('实例请求拦截器')

      return config
    },
    // 响应拦截器
    responseInterceptors: result => {
      console.log('实例响应拦截器')
      return result
    },
  },
})

interface MyRequestConfig<T> extends RequestConfig {
  data?: T
}

interface MyResponse<T> {
  code: number,
  message: string,
  data: T,
  msg: string,
  resultCode: string,
  success: boolean
}

const myRequest = <D, T>(config: MyRequestConfig<D>) => {
  console.log(config)
  return request.request<MyResponse<T>>(config)
}

export default myRequest
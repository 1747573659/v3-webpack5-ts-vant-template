// types.ts
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
export interface RequestInterceptors {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: AxiosError) => AxiosError
  // 响应拦截
  responseInterceptors?: <T = AxiosResponse>(config: T) => T
  responseInterceptorsCatch?: (err: AxiosError) => AxiosError
}
// 自定义传入的参数
export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors
}

export interface LoginReq {
  loginName: string,
  password: string
}

export interface LoginRep {
  token: string
}

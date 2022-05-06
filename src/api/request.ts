import axios from "axios";
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { RequestConfig, RequestInterceptors } from "./types";

class Request {
  instance: AxiosInstance

  interceptorsObj?: RequestInterceptors

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptorsObj = config.interceptors

    // 实例请求拦截器 -> 全局请求拦截器 -> 实例响应拦截器 -> 全局响应拦截器

    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => {
        console.log('全局请求拦截器')
        return res
      },
      (err: AxiosError) => err
    )

    // 实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    )

    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log('全局响应拦截器')
        return res.data
      },
      (err: AxiosError) => err
    )
  }

  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      this.instance
        .request<AxiosError, T>(config)
        .then(res => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors<T>(res)
          }
          resolve(res)
        })
        .catch((err: AxiosError) => {
          reject(err)
        })
    })
  }
}

export default Request
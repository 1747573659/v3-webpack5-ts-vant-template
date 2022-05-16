// types.ts
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
export interface RequestInterceptors {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: AxiosError) => AxiosError
  // 响应拦截
  responseInterceptors?: <T = AxiosResponse>(config: any) => T
  responseInterceptorsCatch?: (err: AxiosError) => AxiosError
}
// 自定义传入的参数
export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors
}

export interface LoginReq {
  loginItem: string,
  loginItemType: number,
  openId: string,
  shopAdminId: number
}

export interface LoginRep {
  phone: string,
  shopAdminId: string,
  loginItemType: string
}
export interface withdrawalInfoReq {
  shopAdminId: number,
  walletId:string
}
export interface withdrawalInfoRep {
  planType: number,
  planTime?: string
}
export interface reviseConfigReq {
  planType: number,
  planTime?: string,
  shopAdminId: number,
  walletId: string
}
export interface BillAmountRep {
  expend: number|null,
  income: number|null
}

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
  loginItem: string
  loginItemType: number
  openId: string
  shopAdminId: number
}
export interface LoginRep {
  phone: string
  shopAdminId: string
  loginItemType: string
}

export interface LoginPhoneCodeReq {
  code: string
  openId: string
  phone: string
  shopAdminId: number
}
export interface WalletList {
  walletId: string
  shortShopName: string
}
export interface LoginPhoneCodeRep {
  phone: string
  shopAdminId: number
  token: string
  walletList: WalletList
}
export interface walletDetailReq {
  shopAdminId: number
  walletId: string
}
export interface walletDetailRep {
  accountName: string
  availableAmount: number
  bankCard: string
  walletId: string
  shortShopName: string
}
export interface withdrawalInfoReq {
  shopAdminId: number
  walletId: string
}
export interface withdrawalInfoRep {
  planType: number
  planTime?: string
}
export interface reviseConfigReq {
  planType: number
  planTime?: string
  shopAdminId: number
  walletId: string
}
export interface BillAmountReq {
  expend: number | null
  income: number | null
}
export interface BillAmountRep {
  expenditureAmount: number | null | undefined
  incomeAmount: number | null | undefined
}
export interface walletInfoDetailReq {
  shopAdminId: number
  walletId: string
}
export interface walletInfoDetailRep {
  accountName: string
  availableAmount?: number
  bankCard: string
  businessLicense: string
  legalName: string
  legalNumber: string
  legalPhone: string
  openBank: string
  shopName: string
  shortShopName: string
  tradeBalanceAmount?: number
  tradeDepositAmount?: number
  walletId: string
}
export interface billDetailsReq {
  categoryType: string | number
  transactionNo: string | number
  transactionType: string | number
}
export interface billDetailsRep {
  orderType: number
  category: number
  [propName: string]: string | number | Array<{ counterpartWalletId: string }> | null | undefined
}
export interface billStatementReq {
  page: number
  rows: number
  walletId: string
  transactionType?: number
  startTime?: string
  endTime?: string
}
export interface billStatementRep {
  orderType: number
  category: number
  [propName: string]: string | number
}
export interface billAmountRep {
  expenditureAmount: number
  incomeAmount: number
}

export interface withdrawDetailReq {
  shopAdminId: number
  walletId: string
}
export interface withdrawDetailRep {
  accountName: string
  availableAmount: number
  bankCard: string
  legalPhone: string
  openBank: string
  openBankCnap: string
  tradeBalanceAmount: string
  tradeDepositAmount: string
}

export interface withdrawApplyReq {
  shopAdminId: number
  totalAmount: number
  walletId: string
}
export interface withdrawApplyRep {
  sn: string
  thirdSn: string
}

export interface withdrawConfirmReq {
  sn: string
  thirdSn: string
  walletId: string
}

export interface logoutReq {
  openId: string
  walletId: string
}

export interface checkNeedVerifySliderReq {
  sendItem: string,
  shopAdminId: number
}

export interface smsSendReq {
  phone: string,
  smsBusinessType: number
}

export interface smsValidCodeReq {
  code: string,
  phone: string
}

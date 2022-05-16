import request from './index'
import {
  LoginReq,
  LoginRep,
  withdrawalInfoReq,
  withdrawalInfoRep,
  reviseConfigReq,
  walletInfoDetailReq,
  walletInfoDetailRep
} from './types'

export const LoginGetCode = (data: LoginReq) => {
  return request<LoginReq, LoginRep>({
    url: '/wallet/login/getCode',
    method: 'post',
    data: data
  })
}

//  首页-商户信息-获取商户信息详情
export const queryMerchantInfo = (data: walletInfoDetailReq) => {
  return request<walletInfoDetailReq, walletInfoDetailRep>({
    url: '/wallet/detail',
    method: 'post',
    data
  })
}
//  账单-获取账单流水列表
export const queryBillStatement = (data: any) => {
  return request({
    url: '/wallet/accountBill/pageQuery',
    method: 'post',
    data
  })
}

//  账单-获取账单收支汇总
export const queryBillAmount = (data: any) => {
  return request({
    url: '/wallet/accountBill/pageCount',
    method: 'post',
    data
  })
}

//  账单详情-获取详情
export const queryBillDetails = (data: any) => {
  return request({
    url: '/wallet/accountBill/detail',
    method: 'post',
    data
  })
}

//  提现-提现设置-获取提现设置详情
export const queryTimingWithdrawalInfo = (data: withdrawalInfoReq) => {
  return request<withdrawalInfoReq, withdrawalInfoRep>({
    url: '/wallet/withdraw/config/query',
    method: 'post',
    data
  })
}

//  提现-提现设置-修改定时提现
export const reviseTimingWithdrawal = (data: reviseConfigReq) => {
  return request<reviseConfigReq, any>({
    url: '/wallet/withdraw/config/edit',
    method: 'post',
    data
  })
}

import request from './index'
import { LoginReq, LoginRep,withdrawalInfoReq,withdrawalInfoRep, reviseConfigReq } from './types'

export const LoginGetCode = (data: LoginReq) => {
  return request<LoginReq, LoginRep>({
    url: '/wallet/login/getCode',
    method: 'post',
    data: data
  })
}

export const queryBillStatement = (data:any) => {
  return request({
    url: '/',
    method: 'post',
    params: data
  })
}

//  账单详情-获取详情
export const queryBillDetails = (data:any) => {
  return request({
    url: '/',
    method: 'post',
    params: data
  })
}

//  提现-提现设置-获取提现设置详情
export const queryTimingWithdrawalInfo = (data:withdrawalInfoReq) => {
  return request<withdrawalInfoReq, withdrawalInfoRep>({
    url: '/wallet/withdraw/config/query',
    method: 'post',
    data,
  })
}

//  提现-提现设置-修改定时提现
export const reviseTimingWithdrawal = (data:reviseConfigReq) => {
  return request<reviseConfigReq, any>({
    url: '/wallet/withdraw/config/edit',
    method: 'post',
    data
  })
}
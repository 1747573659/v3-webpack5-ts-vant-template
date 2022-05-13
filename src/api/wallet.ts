import request from './index'
import { LoginReq, LoginRep,withdrawalInfoReq,withdrawalInfoRep } from './types'

export const Login = (data: LoginReq) => {
  return request<LoginReq, LoginRep>({
    url: '/login',
    method: 'post',
    params: data
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
export const reviseTimingWithdrawal = (data:any) => {
  return request({
    url: '/',
    method: 'post',
    params: data
  })
}
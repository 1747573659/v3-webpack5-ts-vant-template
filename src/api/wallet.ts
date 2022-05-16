/*
 * @Date         : 2022-05-06 20:48:00
 * @LastEditors  : 庄鸿斌
 * @LastEditTime : 2022-05-16 18:28:57
 */
import request from './index'
import { LoginReq,
  LoginRep,
  LoginPhoneCodeReq,
  LoginPhoneCodeRep,
  withdrawalInfoReq,
  withdrawalInfoRep,
  reviseConfigReq,
  walletDetailReq,
  walletDetailRep } from './types'

// 获取登录短信验证码
export const LoginGetCode = (data: LoginReq) => {
  return request<LoginReq, LoginRep>({
    url: '/wallet/login/getCode',
    method: 'post',
    data
  })
}
// 手机验证码登录
export const loginPhoneCode = (data: LoginPhoneCodeReq) => {
  return request<LoginPhoneCodeReq, LoginPhoneCodeRep>({
    url: '/wallet/login/phoneCode',
    method: 'post',
    data
  })
}

//  账单详情-获取详情
export const walletDetail = (data: walletDetailReq) => {
  return request<walletDetailReq, walletDetailRep>({
    url: '/wallet/detail',
    method: 'post',
    data
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
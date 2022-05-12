import request from './index'
import { LoginReq, LoginRep } from './types'

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
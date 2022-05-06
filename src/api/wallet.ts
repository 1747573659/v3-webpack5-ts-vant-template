import request from './index'
import { LoginReq, LoginRep } from './types'

export const Login = (data: LoginReq) => {
  return request<LoginReq, LoginRep>({
    url: '/login',
    method: 'post',
    params: data
  })
}
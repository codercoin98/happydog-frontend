// 导入axios实例
import httpRequest from '@/request/index'
//注册
export function signin(info: AUTH_API.SignInParams) {
  return httpRequest({
    url: '/api/auth/signin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: info,
  })
}
//注册
export function signUp(info: AUTH_API.SignUpParams) {
  return httpRequest({
    url: '/api/auth/signup',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: info,
  })
}
// 获取验证码
export function getCaptcha() {
  return httpRequest({
    url: '/api/auth/code',
    method: 'get',
  })
}

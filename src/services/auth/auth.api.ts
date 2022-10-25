// 导入axios实例
import httpRequest from '@/request/index'
//注册
export function signin(info: { username: string; password: string }) {
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
export function signUp(info: { username: string; password: string; captcha: string }) {
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

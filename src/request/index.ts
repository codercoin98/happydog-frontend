import {
  CAPTCHA_NOT_MATCH,
  USERNAME_ALREADY_EXISTS,
  USERNAME_OR_PASSWORD_NOT_MATCH,
} from '@/constans/error'
import axios from 'axios'
// 创建一个 axios 实例
const service = axios.create({
  withCredentials: true,
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    const response = error.response
    switch (response.status) {
      case 400:
        if (response.data.message === USERNAME_OR_PASSWORD_NOT_MATCH) {
          window.$message.error('用户名或密码错误')
        } else if (response.data.message === CAPTCHA_NOT_MATCH) {
          window.$message.error('验证码错误！')
        } else if (response.data.message === USERNAME_ALREADY_EXISTS) {
          window.$message.error('用户名已存在！')
        }
        break
      case 401:
        window.$message.error('请先登录！')
        break
      case 403:
        window.$message.error('没有权限！')
        break
      case 404:
        window.$message.error('资源不存在！')
        break
      case 500:
        window.$message.error('服务器发生错误！')
        break
      default:
        break
    }
    return Promise.reject(error)
  }
)

export default service

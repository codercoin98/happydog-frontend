// 导入axios实例
import httpRequest from '@/request/index'
//获取所有的用户
export function getAllUser() {
  return httpRequest({
    url: 'api/user/findAll',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
//根据用户名获取用户
export function getUserByUsername(username: string) {
  return httpRequest({
    url: `api/user/findOne?username=${username}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

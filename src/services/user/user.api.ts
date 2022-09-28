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
//根据ID获取用户
export function getUserById(uid: string) {
  return httpRequest({
    url: `api/user/findOne?uid=${uid}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 导入axios实例
import httpRequest from '@/request/index'
import { AxiosPromise } from 'axios'
//获取所有的用户
export function getAllUser(): AxiosPromise<{ num: number }> {
  return httpRequest({
    url: 'api/user/findAll',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
//根据ID获取用户
export function getUserById(uid: string): AxiosPromise<USER_API.User>{
  return httpRequest({
    url: `api/user/findOne?uid=${uid}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

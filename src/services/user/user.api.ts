// 导入axios实例
import httpRequest from '@/request/index'
import { AxiosPromise } from 'axios'
import { User } from '@/types/user'
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
export function getUserById(uid: string): AxiosPromise<User> {
  return httpRequest({
    url: `api/user/findOne?uid=${uid}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
//根据id更新用户信息
export function updateUserById(
  uid: string,
  updateData: {
    nickname: string
    avatar_url: string
    bio: string
  }
): AxiosPromise<User> {
  return httpRequest({
    url: `api/user/update/${uid}`,
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    data: updateData,
  })
}

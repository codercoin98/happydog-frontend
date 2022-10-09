// 导入axios实例
import httpRequest from '@/request/index'
import { AxiosPromise } from 'axios'
import { DeleteResult } from '../api'
//创建回复
export function createComment(reply: REPLY_API.CreateReplyParams): AxiosPromise<REPLY_API.Reply> {
  return httpRequest({
    url: '/api/reply/create',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: reply,
  })
}
//删除回复
export function deleteReplyById(reply_id: string): AxiosPromise<DeleteResult> {
  return httpRequest({
    url: `/api/comment/delete/${reply_id}`,
    method: 'delete',
  })
}

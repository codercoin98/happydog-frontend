// 导入axios实例
import httpRequest from '@/request/index'
import { ReplyFull } from '@/types/reply'
import { AxiosPromise } from 'axios'
import { DeleteResult } from '@/types/api'
//创建回复
export function createReply(reply: {
  post_id: string
  content: string
  user_id: string
  reply_to_user_id: string
  reply_to_comment_id: string
  reply_to_reply_id?: string
}): AxiosPromise<ReplyFull[]> {
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
    url: `/api/reply/delete/${reply_id}`,
    method: 'delete',
  })
}

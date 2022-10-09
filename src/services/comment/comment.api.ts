// 导入axios实例
import httpRequest from '@/request/index'
import { AxiosPromise } from 'axios'
import { DeleteResult } from '../api'
//创建评论
export function createComment(
  comment: COMMENT_API.CreateCommentParams
): AxiosPromise<COMMENT_API.Comment> {
  return httpRequest({
    url: '/api/comment/create',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: comment,
  })
}
//根据post_id查询所有的评论
export function findAllCommentsById(post_id: string): AxiosPromise<COMMENT_API.CommentFull[]> {
  return httpRequest({
    url: '/api/comment/findAll',
    method: 'get',
    params: {
      post_id: post_id,
    },
  })
}
//删除评论
export function deleteCommentById(comment_id: string): AxiosPromise<DeleteResult> {
  return httpRequest({
    url: `/api/comment/delete/${comment_id}`,
    method: 'delete',
  })
}

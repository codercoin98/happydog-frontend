// 导入axios实例
import { Post, PostFull } from '@/types/post'
import httpRequest from '@/request/index'
import { AxiosPromise } from 'axios'
import { DeleteResult, UpdateResult } from '../../types/api'
//创建帖子
export function createPost(post: {
  title: string
  content: string
  author_id: string
  categories: string[]
}): AxiosPromise<Post> {
  return httpRequest({
    url: '/api/post/create',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: post,
  })
}
//获取帖子
export function getAllPost(params: {
  currentPage: number
  size: number
}): AxiosPromise<PostFull[]> {
  return httpRequest({
    url: '/api/post/findAll',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
    params: params,
  })
}
//根据id获取帖子的详情
export function getPostById(post_id: string): AxiosPromise<PostFull[]> {
  return httpRequest({
    url: `/api/post/findOne?post_id=${post_id}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
//更新帖子的详情
export function updatePostById(
  post_id: string,
  postInfo: {
    title: string
    content: string
    author_id: string
  }
): AxiosPromise<UpdateResult> {
  return httpRequest({
    url: `/api/post/findOne?post_id=${post_id}`,
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    data: postInfo,
  })
}
//根据id删除帖子
export function deletePostById(post_id: string): AxiosPromise<DeleteResult> {
  return httpRequest({
    url: `/api/post/delete?post_id=${post_id}`,
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

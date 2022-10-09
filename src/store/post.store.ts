import { defineStore } from 'pinia'
import { PostFull } from '@/pages/Home/types'
import { getPostById } from '@/services/post/post.api'
import { findAllCommentsById } from '@/services/comment/comment.api'
interface UserState {
  post: PostFull | null
  comments: COMMENT_API.CommentFull[]
}
const usePostStore = defineStore('post', {
  state: (): UserState => ({
    post: null,
    comments: [],
  }),
  getters: {},
  actions: {
    //获取帖子信息
    async getPostById(post_id: string): Promise<PostFull | void> {
      try {
        const { data } = await getPostById(post_id)
        if (data.length > 0) {
          this.post = data[0]
          return data[0]
        }
      } catch (error) {
        return
      }
    },
    //获取帖子的评论
    async getComments(post_id: string): Promise<COMMENT_API.CommentFull[] | void> {
      try {
        const { data } = await findAllCommentsById(post_id)
        if (data.length > 0) {
          this.comments = data
          return data
        }
      } catch (error) {
        return
      }
    },
  },
})

export default usePostStore

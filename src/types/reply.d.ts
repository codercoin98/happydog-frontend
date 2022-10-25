import { Comment } from './comment'
export interface Reply extends Comment {
  reply_to_comment_id: string
  reply_to_reply_id: string
}
export interface ReplyFull {
  _id: string
  post_id: string
  content: string
  reply_to_comment_id: string
  reply_to_reply_id: string
  like: number
  user: [
    {
      _id: string
      nickname: string
      avatar_url: string
    }
  ]
  reply_to_user: [
    {
      _id: string
      nickname: string
      avatar_url: string
    }
  ]
  created_at: string
}

export interface Comment {
  _id: string
  post_id: string
  content: string
  user_id: string
  like: number
  created_at: string
}
export interface CommentFull {
  _id: string
  post_id: string
  content: string
  user: [
    {
      _id: string
      nickname: string
      avatar_url: string
    }
  ]
  like: number
  reply_list: REPLY_API.ReplyFull[]
  created_at: string
}

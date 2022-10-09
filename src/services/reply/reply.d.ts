declare namespace REPLY_API {
  interface Reply extends COMMENT_API.Comment {
    reply_to_comment_id: string
    reply_to_reply_id: string
  }
  interface CreateReplyParams {
    post_id: string
    content: string
    user_id: string
    reply_to_comment_id: string
    reply_to_reply_id?: string
  }
  interface ReplyFull {
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
    created_at: string
  }
}

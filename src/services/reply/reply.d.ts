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
}

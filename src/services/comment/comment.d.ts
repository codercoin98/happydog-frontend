declare namespace COMMENT_API {
  interface Comment {
    _id: string
    post_id: string
    content: string
    user_id: string
    like: number
    created_at: string
  }
  interface CreateCommentParams {
    post_id: string
    content: string
    user_id: string
  }
}

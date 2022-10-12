export interface Post {
  _id: string
  title: string
  content: string
  author: [
    {
      _id: string
      nickname: string
      avatar_url: string
    }
  ]
  created_at: string
}
export interface PostFull extends Post {
  comment_count: number
}

export interface Post {
  _id: string
  title: string
  content: string
  images_urls: string[]
  author_id: string
  created_at: string
}
export interface PostFull {
  _id: string
  title: string
  content: string
  images_urls: string[]
  author: [
    {
      _id: string
      username: string
      nickname: string
      avatar_url: string
    }
  ]
  created_at: string
}

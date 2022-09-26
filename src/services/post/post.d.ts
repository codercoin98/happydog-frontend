declare namespace POST_API {
  interface Post {
    _id: string
    title: string
    content: string
    images_urls: string[]
    author_id: string
    created_at: string
  }
  interface PostFull {
    _id: string
    title: string
    content: string
    images_urls: string[]
    author: {
      _id: string
      username: string
      nickname: string
      avatar_url: string
    }
    created_at: string
  }
  interface CreatePostParams {
    title: string
    content: string
    image_urls: string[]
    author_id: string
  }
  interface UpdatePostParams {
    title: string
    content: string
    author_id: string
  }
  interface UpdateResult {
    acknowledged: boolean
    modifiedCount: number
    upsertedId: string | null
    upsertedCount: number
    matchedCount: number
  }
  interface DeleteResult {
    acknowledged: boolean
    deletedCount: number
  }
}

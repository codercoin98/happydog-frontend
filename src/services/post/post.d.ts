declare namespace POST_API {
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

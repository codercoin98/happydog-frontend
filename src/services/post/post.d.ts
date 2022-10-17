declare namespace POST_API {
  interface CreatePostParams {
    title: string
    content: string
    author_id: string
    categories: string[]
  }
  interface UpdatePostParams {
    title: string
    content: string
    author_id: string
  }
}

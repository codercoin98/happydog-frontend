declare namespace USER_API {
  interface User {
    _id: string
    username: string
    nickname: string
    avatar_url: string
    mood: string
    bio: string
    following: number
    follower: number
    created_at: string
  }
  interface UpdateData {
    nickname: string
    avatar_url: string
    bio: string
  }
}

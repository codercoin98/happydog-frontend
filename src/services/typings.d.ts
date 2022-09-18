declare namespace USER_API {
  interface SignUpParams {
    username: string
    password: string
    captcha: string
  }
  interface User {
    _v: number
    _id: string
    username: string
    password: string
  }
}

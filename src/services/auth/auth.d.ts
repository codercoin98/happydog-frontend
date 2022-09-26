declare namespace AUTH_API {
  interface SignInParams {
    username: string
    password: string
  }
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

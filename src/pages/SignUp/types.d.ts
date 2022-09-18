declare namespace SIGN_IN {
  interface State {
    userNumber: number
    captcha: string | null
    formModel: {
      username: string | null
      password: string | null
      rePassword: string | null
      captcha: string | null
    }
  }
}

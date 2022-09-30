import { defineStore } from 'pinia'
import { getUserById } from '@/services/user/user.api'
import jwt_decode from 'jwt-decode'
import { Token } from '@/pages/SignIn/types'
interface UserState {
  access_token: string | null
  userInfo: USER_API.User | null
}
const useUserStore = defineStore('user', {
  state: (): UserState => ({
    access_token: null,
    userInfo: null,
  }),
  getters: {},
  actions: {
    //根据uid获取用户信息
    async getUser() {
      const decode: Token = jwt_decode(this.access_token!)
      try {
        const { data } = await getUserById(decode.uid)
        if (data) {
          this.userInfo = data
          return data
        }
      } catch (error) {
        return error
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'token',
        storage: localStorage,
        paths: ['access_token'],
      },
    ],
  },
})

export default useUserStore

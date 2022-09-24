import { Token } from '@/pages/SignIn/types'
import jwt_decode from 'jwt-decode'
import { defineStore } from 'pinia'
const useUserStore = defineStore('user', {
  state: () => ({
    access_token: '',
    username: '',
    avatar_url: '',
  }),
  getters: {
    //获取token，先检查pinia中的token，再检查本地的token
    getToken: (state): string => {
      if (state.access_token !== '') {
        return state.access_token
      }
      const local_token = localStorage.getItem('token')
      if (local_token) {
        state.access_token = local_token
        return local_token
      }
      return state.access_token
    },
    //根据access_token获取用户名
    /**
     * 
     * @param state 
     * @returns username: string
     */
    getUsername(state) {
      if (state.username !== '') {
        return state.username
      }
      const decode: Token = jwt_decode(this.getToken)
      return decode.username
    },
  },
})

export default useUserStore

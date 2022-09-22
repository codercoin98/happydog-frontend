import { defineStore } from 'pinia'
const useUserStore = defineStore('user', {
  state: () => ({
    access_token: '',
    username: ''
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
  },
})

export default useUserStore

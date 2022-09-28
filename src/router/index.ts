import * as VueRouter from 'vue-router'
import routes from './routes'
import { useUserStore } from '@/store'

const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes,
})
//全局路由守卫
router.beforeEach((to, from) => {
  const userStore = useUserStore()
  //需要登录才能访问的路由
  if (to.path === '/profile' || to.path === '/create') {
    //判断用户登录状态
    if (!userStore.access_token) {
      //没有token
      window.$message.warning('请先登录')
      return {
        name: 'sign_in',
      }
    }
  }
})
export default router

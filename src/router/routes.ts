const SignIn = () => import('@/pages/SignIn/index.vue')
const SignUp = () => import('@/pages/SignUp/index.vue')
const Home = () => import('@/pages/Home/index.vue')
const Games = () => import('@/pages/Games/index.vue')
const Forums = () => import('@/pages/Forums/index.vue')
const Profile = () => import('@/pages/Profile/index.vue')
const Help = () => import('@/pages/Help/index.vue')
const Create = () => import('@/pages/Create/index.vue')
const Post = () => import('@/pages/Post/index.vue')
import { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store'
//路由配置表
const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/home',
    component: Home,
  },
  {
    name: 'games',
    path: '/games',
    component: Games,
  },
  {
    name: 'forums',
    path: '/forums',
    component: Forums,
  },
  {
    name: 'profile',
    path: '/profile',
    component: Profile,
    beforeEnter: (to, from): boolean => {
      const userStore = useUserStore()
      if (userStore.getToken === '') {
        window.$message.warning('请先登录')
        return false
      }
      return true
    },
  },
  {
    name: 'sign_in',
    path: '/sign-in',
    component: SignIn,
  },
  {
    name: 'sign_up',
    path: '/sign-up',
    component: SignUp,
  },
  {
    name: 'help',
    path: '/help',
    component: Help,
  },
  {
    name: 'create',
    path: '/create',
    component: Create,
    beforeEnter: (to, from): boolean => {
      const userStore = useUserStore()
      if (userStore.access_token === '') {
        window.$message.warning('请先登录')
        return false
      }
      return true
    },
  },
  {
    name: 'post',
    path: '/post/:post_id',
    component: Post,
  },
  {
    path: '/',
    redirect: '/home',
  },
]
export default routes

const SignIn = () => import('@/pages/signIn/index.vue')
const SignUp = () => import('@/pages/signUp/index.vue')
const Home = () => import('@/pages/home/index.vue')
const Games = () => import('@/pages/games/index.vue')
const Forums = () => import('@/pages/forums/index.vue')
const Profile = () => import('@/pages/profile/index.vue')
const About = () => import('@/pages/about/index.vue')
const Tos = () => import('@/pages/tos/index.vue')
const Create = () => import('@/pages/create/index.vue')
const Post = () => import('@/pages/post/index.vue')
import { RouteRecordRaw } from 'vue-router'
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
    name: 'about',
    path: '/about',
    component: About,
  },
  {
    name: 'tos',
    path: '/tos',
    component: Tos,
  },
  {
    name: 'create',
    path: '/create',
    component: Create,
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

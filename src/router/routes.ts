const SignIn = () => import('@/pages/SignIn/index.vue')
const SignUp = () => import('@/pages/SignUp/index.vue')
const Home = () => import('@/pages/Home/index.vue')
const PaperPlane = () => import('@/pages/PaperPlane/index.vue')
const Friends = () => import('@/pages/Friends/index.vue')
const FunnyTools = () => import('@/pages/FunnyTools/index.vue')
const Help = () => import('@/pages/Help/index.vue')

import { RouteRecordRaw } from 'vue-router'
//路由配置表
const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'paper-plane',
    path: '/paper-plane',
    component: PaperPlane,
  },
  {
    name: 'friends',
    path: '/friends',
    component: Friends,
  },
  {
    name: 'funny-tools',
    path: '/funny-tools',
    component: FunnyTools,
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
]
export default routes

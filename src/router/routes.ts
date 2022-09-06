const Main = () => import('@/pages/Main/index.vue')
const SignIn = () => import('@/pages/SignIn/index.vue')
const SignUp = () => import('@/pages/SignUp/index.vue')
const Home = () => import('@/pages/Home/index.vue')
const PaperPlane = () => import('@/pages/PaperPlane/index.vue')
const Friends = () => import('@/pages/Friends/index.vue')
const FunnyTools = () => import('@/pages/FunnyTools/index.vue')
import { RouteRecordRaw } from 'vue-router'
//路由配置表
const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: Main,
    children: [
      {
        path: '/',
        components: {
          rightView: Home,
        },
      },
      {
        path: 'paper-plane',
        components: {
          rightView: PaperPlane,
        },
      },
      {
        path: 'friends',
        components: {
          rightView: Friends,
        },
      },
      {
        path: 'tools',
        components: {
          rightView: FunnyTools,
        },
      },
    ],
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
]
export default routes

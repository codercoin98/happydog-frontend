const Home = () => import('@/pages/Home/index.vue')
const Login = () => import('@/pages/Login/index.vue')
import { RouteRecordRaw } from 'vue-router'
//路由配置表
const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
  },
]
export default routes

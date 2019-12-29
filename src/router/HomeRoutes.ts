import { RouteConfig } from 'vue-router'
const HomeRoutes: RouteConfig = {
  path: '/',
  name: 'HomePage',
  component: () => import('@/views/home/HomePage.vue')
}
export default HomeRoutes

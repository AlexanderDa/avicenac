import { RouteConfig } from 'vue-router'
const RootRoutes: RouteConfig = {
  path: '/',
  name: 'RootPage',
  component: () => import('@/views/root/RootPage.vue')
}
export default RootRoutes

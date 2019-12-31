import { RouteConfig } from 'vue-router'
const NotFoundRoutes: RouteConfig = {
  path: '*',
  name: 'NotFoundPage',
  component: () => import('@/views/404/NotFoundPage.vue')
}
export default NotFoundRoutes

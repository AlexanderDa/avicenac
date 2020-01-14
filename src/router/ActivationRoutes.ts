import { RouteConfig } from 'vue-router'
const LoginRoutes: RouteConfig = {
  path: '/activar',
  name: 'ActivationPage',
  component: () => import('@/views/activation/ActivationPage.vue')
}
export default LoginRoutes

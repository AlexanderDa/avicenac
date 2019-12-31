import { RouteConfig } from 'vue-router'
const AdminRoutes: RouteConfig = {
  path: '/admin',
  name: 'Admin',
  component: () => import('@/layouts/admin/AdminLayout.vue'),
  redirect: { name: 'DashboardPage' },
  children: [
    {
      path: '',
      name: 'DashboardPage',
      component: () => import('@/views/admin/dashboard/DashboardPage.vue')
    }
  ]
}
export default AdminRoutes

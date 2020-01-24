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
    },
    {
      path: 'personal',
      name: 'PersonalPage',
      component: () => import('@/views/admin/personal/PersonalPage.vue')
    },
    {
      path: 'usuarios',
      name: 'UserPage',
      component: () => import('@/views/admin/user/UserPage.vue')
    },
    {
      path: 'pacientes',
      name: 'PatientPage',
      component: () => import('@/views/admin/patient/PatientPage.vue')
    },
    {
      path: 'doctores',
      name: 'DoctorPage',
      component: () => import('@/views/admin/doctor/DoctorPage.vue')
    },
    {
      path: 'reservacion',
      name: 'ReservationPage',
      component: () => import('@/views/admin/reservation/ReservationPage.vue')
    },
    {
      path: 'hospital',
      name: 'HospitalPage',
      component: () => import('@/views/admin/hospital/HospitalPage.vue')
    }
  ]
}
export default AdminRoutes

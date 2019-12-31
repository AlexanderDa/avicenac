import Vue from 'vue'
import VueRouter from 'vue-router'
import RootRoutes from '@/router/RootRoutes'
import NotFoundRoutes from '@/router/NotFoundRoutes'
import LoginRoutes from '@/router/LoginRoutes'
import AdminRoutes from '@/router/AdminRoutes'

Vue.use(VueRouter)

const routes = [
  RootRoutes,
  NotFoundRoutes,
  LoginRoutes,
  AdminRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

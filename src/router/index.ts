import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeRoutes from '@/router/HomeRoutes'

Vue.use(VueRouter)

const routes = [
  HomeRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

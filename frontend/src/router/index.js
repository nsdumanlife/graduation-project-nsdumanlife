import { createRouter, createWebHistory } from 'vue-router'
import BungalovsView from '../views/BungalovsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BungalovsView
    },
    {
      path: '/bungalovs',
      name: 'bungalovs',
      component: () => import('../views/BungalovsView.vue')
    },
    {
      path: '/bungalovs/:id',
      name: 'bungalov',
      component: () => import('../views/BungalovView.vue')
    },
    {
      path: '/my-bookings',
      name: 'my-bookings',
      component: () => import('../views/MyBookingsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router

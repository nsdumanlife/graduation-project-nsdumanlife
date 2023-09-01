import { createRouter, createWebHistory } from 'vue-router'
import { useAccountStore } from '../stores/account'
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
      component: () => import('../views/MyBookingsView.vue'),
      meta: {
        requiresAuth: true
      }
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

router.beforeEach(async (to) => {
  const store = useAccountStore()
  await store.fetchUser()

  if (to.meta.requiresAuth && !store.user) return '/login'
})

export default router

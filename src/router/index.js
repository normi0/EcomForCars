import { createRouter, createWebHistory } from 'vue-router'
// import { getAuth } from 'firebase/auth'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import { auth } from '@/config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import AddCars from '../views/AddCars.vue'
import Properties from '../components/Properties.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true },
    },
    {
      path: '/add-cars',
      name: 'add-cars',
      component: AddCars,
      meta: { requiresAuth: true },
    },
    {
      path: '/properties',
      name: 'properties',
      component: Properties,
      meta: { requiresAuth: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresGuest: true },
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/wishList',
      name: 'wishList',
      component: () => import('../views/WishList.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/purchase-history',
      name: 'purchase-history',
      component: () => import('../views/PerchaceHistory.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// Navigation guard with proper handling of requiresAuth and requiresGuest
router.beforeEach((to, from, next) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe() // Unsubscribe to prevent memory leaks

    if (to.meta.requiresAuth && !user) {
      next('/login')
    } else if (to.meta.requiresGuest && user) {
      next('/home')
    } else {
      next()
    }
  })
})

export default router

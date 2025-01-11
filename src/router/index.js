import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true },
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
  ],
})

// Simplified navigation guard
router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const user = auth.currentUser
  console.log('Current user:', user) // Log the current user
  console.log('navigating to:', to.path) // Log the path being navigated to
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)

  if (requiresAuth && !user) {
    console.log('Redirecting to login (requiresAuth)')
    next('/login')
  } else if (requiresGuest && user) {
    console.log('Redirecting to home (requiresGuest)')
    next('/home') // Redirect to home if trying to access login/register while logged in
  } else {
    console.log('Navigating to:', to.path)
    next()
  }
})

export default router

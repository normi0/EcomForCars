import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const token = ref(localStorage.getItem('token') || null)

  const setUser = (userData) => {
    user.value = userData
    isAuthenticated.value = true
    if (userData?.token) {
      token.value = userData.token
      localStorage.setItem('token', userData.token)
    }
  }

  const clearUser = () => {
    user.value = null
    isAuthenticated.value = false
    token.value = null
    localStorage.removeItem('token')
  }

  const checkAuth = () => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      // Verify token with backend
      // If valid, setUser()
      // If invalid, clearUser()
    }
  }

  return {
    user,
    isAuthenticated,
    token,
    setUser,
    clearUser,
    checkAuth,
  }
})

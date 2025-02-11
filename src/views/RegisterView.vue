<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <!-- Fixed Navigation Bar -->
    <nav
      class="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-50 transition-all duration-300"
      :class="{ 'shadow-md bg-opacity-95 backdrop-blur-sm': isScrolled }"
    >
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <!-- Logo/Brand -->
          <router-link to="/" class="text-xl font-bold text-gray-900 dark:text-white">
            TaskFlow
          </router-link>

          <!-- Navigation Links -->
          <div class="flex items-center space-x-6">
            <router-link
              to="/login"
              class="text-gray-600 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-500 transition-colors duration-200"
              :class="{ 'text-green-500 dark:text-green-500': $route.path === '/login' }"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="text-gray-600 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-500 transition-colors duration-200"
              :class="{ 'text-green-500 dark:text-green-500': $route.path === '/register' }"
            >
              Register
            </router-link>
            <button
              @click="toggleTheme"
              class="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Theme"
            >
              <!-- Sun icon for dark mode -->
              <svg
                v-if="isDark"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="{2}"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <!-- Moon icon for light mode -->
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="{2}"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Add margin-top to account for fixed navbar -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 mt-16">
      <div class="max-w-md w-full space-y-8">
        <!-- Header -->
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create your account</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <router-link
              to="/login"
              class="font-medium text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200"
            >
              Sign in here
            </router-link>
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="register" class="mt-8 space-y-6">
          <!-- Name Input -->
          <div class="space-y-2">
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              placeholder="Enter your full name"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
          </div>

          <!-- Email Input -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter your email address"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
          </div>

          <!-- Password Input -->
          <div class="space-y-2">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              placeholder="Enter your password"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              :class="{ 'border-red-500': errors.password }"
            />
            <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
          </div>

          <!-- Confirm Password Input -->
          <div class="space-y-2">
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              placeholder="Confirm your password"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              :class="{ 'border-red-500': errors.confirmPassword }"
            />
            <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>

    <footer
      class="w-full py-6 px-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
    >
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
          <div class="text-sm text-gray-600 dark:text-gray-400 text-center">
            © 2024 TaskFlow. All rights reserved.
          </div>

          <div class="flex gap-4">
            <a
              href="https://github.com/normi0"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/seif-achi-a3964a254/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
            </a>
            <a
              href="mailto:seif23achi@gmail.com"
              class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>

          <div class="text-sm text-gray-600 dark:text-gray-400 text-center">
            <p>Contact: seif23achi@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { app } from '@/config/firebase'

export default {
  name: 'RegisterView',
  setup() {
    const router = useRouter()
    const auth = getAuth(app)

    const form = ref({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

    const errors = ref({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

    const isScrolled = ref(false)

    // Add scroll handler
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 0
    }

    // Add event listeners
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    // Cleanup
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    const register = async () => {
      // Reset errors
      errors.value = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }

      // Validation
      if (!form.value.name) {
        errors.value.name = 'Name is required'
        return
      }
      if (!form.value.email) {
        errors.value.email = 'Email is required'
        return
      }
      if (!form.value.password) {
        errors.value.password = 'Password is required'
        return
      }
      if (form.value.password.length < 6) {
        errors.value.password = 'Password must be at least 6 characters'
        return
      }
      if (form.value.password !== form.value.confirmPassword) {
        errors.value.confirmPassword = 'Passwords do not match'
        return
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          form.value.email,
          form.value.password,
        )

        // Update profile with name
        await updateProfile(userCredential.user, {
          displayName: form.value.name,
        })

        // Successfully registered and logged in
        console.log('Registered user:', userCredential.user)
        router.push('/')
      } catch (error) {
        console.error('Registration error:', error)
        switch (error.code) {
          case 'auth/email-already-in-use':
            errors.value.email = 'Email already in use'
            break
          case 'auth/invalid-email':
            errors.value.email = 'Invalid email address'
            break
          case 'auth/weak-password':
            errors.value.password = 'Password is too weak'
            break
          default:
            errors.value.email = 'Failed to register. Please try again.'
        }
      }
    }

    const isDark = ref(document.documentElement.classList.contains('dark'))

    const toggleTheme = () => {
      isDark.value = !isDark.value
      document.documentElement.classList.toggle('dark')
      localStorage.theme = isDark.value ? 'dark' : 'light'
    }

    return {
      form,
      errors,
      register,
      isScrolled,
      isDark,
      toggleTheme,
    }
  },
}
</script>
<style scoped>
/* Remove any custom styles that might affect spacing */
</style>

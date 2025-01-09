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
            <!-- Add Theme Toggle Button -->
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
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Sign in to your account
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?
            <router-link
              to="/register"
              class="font-medium text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200"
            >
              Register here
            </router-link>
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="login" class="mt-8 space-y-6">
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
            <!-- Add Forgot Password Link -->
            <button
              @click.prevent="showForgotPassword = true"
              class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Forgot your password?
            </button>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="w-full py-6 px-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
    >
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
          <!-- Copyright -->
          <div class="text-sm text-gray-600 dark:text-gray-400 text-center">
            © 2024 TaskFlow. All rights reserved.
          </div>

          <!-- Social Links -->
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

          <!-- Contact Info -->
          <div class="text-sm text-gray-600 dark:text-gray-400 text-center">
            <p>Contact: seif23achi@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>

    <!-- Forgot Password Modal -->
    <div
      v-if="showForgotPassword"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Reset Password</h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              v-model="resetEmail"
              type="email"
              placeholder="Enter your email address"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div class="flex justify-end gap-2">
            <button
              @click="showForgotPassword = false"
              class="px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              @click="sendResetCode"
              class="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Receive Code
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const form = ref({
      email: '',
      password: '',
    })

    const errors = ref({
      email: '',
      password: '',
    })

    const showForgotPassword = ref(false)
    const resetEmail = ref('')
    const isScrolled = ref(false)
    const isDark = ref(document.documentElement.classList.contains('dark'))

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

    const login = () => {
      // Simple validation
      errors.value = {
        email: '',
        password: '',
      }

      if (!form.value.email) {
        errors.value.email = 'Email is required'
        return
      }
      if (!form.value.password) {
        errors.value.password = 'Password is required'
        return
      }

      // If validation passes, navigate to home
      router.push('/')
    }

    const sendResetCode = () => {
      if (!resetEmail.value) {
        alert('Please enter your email address')
        return
      }
      // Here you would typically send the reset code to the user's email
      alert('If an account exists with this email, you will receive a reset code shortly.')
      showForgotPassword.value = false
    }

    const toggleTheme = () => {
      isDark.value = !isDark.value
      document.documentElement.classList.toggle('dark')
      localStorage.theme = isDark.value ? 'dark' : 'light'
    }

    return {
      form,
      errors,
      login,
      showForgotPassword,
      resetEmail,
      sendResetCode,
      isScrolled,
      isDark,
      toggleTheme,
    }
  },
}
</script>

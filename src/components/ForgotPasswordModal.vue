<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
      <!-- Step 1: Email Input -->
      <div v-if="step === 1">
        <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Reset Password</h3>
        <p class="mb-4 text-gray-600 dark:text-gray-400">
          Enter your email address to receive a verification code.
        </p>

        <input
          type="email"
          v-model="email"
          placeholder="Email"
          class="w-full p-2 mb-4 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border dark:border-gray-600"
        />

        <!-- reCAPTCHA -->
        <div class="mb-4">
          <vue-recaptcha
            ref="recaptcha"
            :sitekey="recaptchaSiteKey"
            @verify="onCaptchaVerified"
            @expired="onCaptchaExpired"
          ></vue-recaptcha>
        </div>
      </div>

      <!-- Step 2: Verification Code -->
      <div v-if="step === 2">
        <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Enter Verification Code
        </h3>
        <p class="mb-4 text-gray-600 dark:text-gray-400">
          We've sent a code to your email. Please enter it below.
        </p>

        <input
          type="text"
          v-model="verificationCode"
          placeholder="Enter code"
          class="w-full p-2 mb-4 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border dark:border-gray-600"
        />
      </div>

      <!-- Step 3: New Password -->
      <div v-if="step === 3">
        <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Set New Password</h3>
        <input
          type="password"
          v-model="newPassword"
          placeholder="New password"
          class="w-full p-2 mb-4 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border dark:border-gray-600"
        />
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm new password"
          class="w-full p-2 mb-4 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border dark:border-gray-600"
        />
      </div>

      <!-- Buttons -->
      <div class="flex justify-end gap-2">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          Cancel
        </button>
        <button
          @click="handleNext"
          class="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          {{ step === 3 ? 'Reset Password' : 'Continue' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'ForgotPasswordModal',
  components: {
    VueRecaptcha,
  },
  emits: ['close'],
  setup(props, { emit }) {
    const step = ref(1)
    const email = ref('')
    const verificationCode = ref('')
    const newPassword = ref('')
    const confirmPassword = ref('')
    const recaptchaSiteKey = 'YOUR_RECAPTCHA_SITE_KEY' // Replace with your actual reCAPTCHA site key
    const captchaVerified = ref(false)

    const onCaptchaVerified = (response) => {
      captchaVerified.value = true
      console.log('reCAPTCHA response:', response)
    }

    const onCaptchaExpired = () => {
      captchaVerified.value = false
    }

    const handleNext = async () => {
      if (step.value === 1) {
        if (!captchaVerified.value) {
          alert('Please complete the captcha')
          return
        }
        // Send verification code to email
        // await sendVerificationCode(email.value)
        step.value = 2
      } else if (step.value === 2) {
        // Verify the code
        // await verifyCode(verificationCode.value)
        step.value = 3
      } else if (step.value === 3) {
        if (newPassword.value !== confirmPassword.value) {
          alert('Passwords do not match')
          return
        }
        // Reset password
        // await resetPassword(email.value, newPassword.value)
        emit('close')
      }
    }

    return {
      step,
      email,
      verificationCode,
      newPassword,
      confirmPassword,
      recaptchaSiteKey,
      handleNext,
      onCaptchaVerified,
      onCaptchaExpired,
    }
  },
}
</script>

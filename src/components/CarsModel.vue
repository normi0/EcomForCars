<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-gray-600/80 dark:bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto"
  >
    <div
      class="my-8 bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full p-8 border border-gray-200 dark:border-amber-500 relative shadow-xl"
    >
      <!-- Header -->
      <div class="flex justify-between items-start mb-6">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ selectedProduct.make }} {{ selectedProduct.model }}
        </h2>
        <button
          @click="closeModal"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
        >
          <span class="sr-only">Close</span>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Tabs -->
      <div class="mb-6">
        <div class="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-4 py-2 font-semibold transition-colors relative',
              activeTab === tab.id
                ? 'text-amber-600 dark:text-amber-500'
                : 'text-gray-600 dark:text-gray-400 hover:text-amber-500',
            ]"
          >
            {{ tab.name }}
            <span
              v-if="activeTab === tab.id"
              class="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500"
            ></span>
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Left Column - Always visible -->
        <div class="space-y-6">
          <img
            :src="selectedProduct.imageUrl"
            :alt="selectedProduct.make"
            class="w-full h-64 object-cover rounded-lg"
          />

          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <div class="flex justify-between items-center mb-2">
              <span class="text-2xl font-bold text-gray-900 dark:text-white">
                ${{ selectedProduct.price.toLocaleString() }}
              </span>
              <span class="text-amber-600 dark:text-amber-500 font-semibold">
                {{ selectedProduct.year }}
              </span>
            </div>
            <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span class="text-amber-500">★</span>
              <span>{{ selectedProduct.rating }} Rating</span>
            </div>
          </div>

          <!-- Key Features moved here -->
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <h3 class="text-xl font-bold text-amber-600 dark:text-amber-500 mb-3">Key Features</h3>
            <ul class="space-y-2">
              <li
                v-for="(feature, index) in selectedProduct.features"
                :key="index"
                class="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <span class="text-amber-500">•</span>
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Column - Tab Content -->
        <div>
          <!-- Vehicle Details Tab -->
          <div v-if="activeTab === 'details'" class="space-y-6">
            <div>
              <h3 class="text-xl font-bold text-amber-600 dark:text-amber-500 mb-4">
                Specifications
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <div
                  v-for="(value, key) in selectedProduct.specifications"
                  :key="key"
                  class="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
                >
                  <span class="text-gray-600 dark:text-gray-400 text-sm capitalize">{{ key }}</span>
                  <p class="font-semibold text-gray-900 dark:text-white">{{ value }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Financing Tab -->
          <div v-if="activeTab === 'financing'" class="space-y-6">
            <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 class="text-xl font-bold text-amber-600 dark:text-amber-500 mb-4">
                Financing Options
              </h3>
              <div class="space-y-4">
                <div
                  class="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700"
                >
                  <span class="text-gray-700 dark:text-gray-300">Monthly Payment</span>
                  <span class="font-bold text-gray-900 dark:text-white">
                    ${{ calculateMonthlyPayment(selectedProduct.price, 60).toLocaleString() }}/mo
                  </span>
                </div>
                <div
                  class="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700"
                >
                  <span class="text-gray-700 dark:text-gray-300">Term Length</span>
                  <span class="font-bold text-gray-900 dark:text-white">60 months</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-700 dark:text-gray-300">APR</span>
                  <span class="font-bold text-gray-900 dark:text-white">4.99%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form Tab -->
          <div v-if="activeTab === 'contact'" class="space-y-6">
            <form @submit.prevent="submitPurchase" class="space-y-4">
              <h3 class="text-xl font-bold text-amber-600 dark:text-amber-500">
                Request Information
              </h3>
              <div class="grid grid-cols-1 gap-4">
                <input
                  v-model="purchaseForm.name"
                  type="text"
                  placeholder="Full Name"
                  required
                  class="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 w-full text-gray-900 dark:text-white placeholder-gray-500 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <input
                  v-model="purchaseForm.email"
                  type="email"
                  placeholder="Email Address"
                  required
                  class="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 w-full text-gray-900 dark:text-white placeholder-gray-500 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <input
                  v-model="purchaseForm.phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                  class="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 w-full text-gray-900 dark:text-white placeholder-gray-500 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <textarea
                  v-model="purchaseForm.message"
                  placeholder="Additional Comments or Questions"
                  class="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 w-full h-32 text-gray-900 dark:text-white placeholder-gray-500 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                </textarea>
              </div>

              <div class="flex justify-end gap-4">
                <button
                  type="button"
                  @click="closeModal"
                  class="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-2 rounded-full transition-colors"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    selectedProduct: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const showModal = ref(true)
    const activeTab = ref('details')
    const tabs = [
      { id: 'details', name: 'Vehicle Details' },
      { id: 'financing', name: 'Financing' },
      { id: 'contact', name: 'Contact' },
    ]
    const purchaseForm = ref({
      name: '',
      email: '',
      phone: '',
      message: '',
    })

    const calculateMonthlyPayment = (price, termLength) => {
      const apr = 4.99 / 100 / 12
      const termInMonths = termLength
      const monthlyPayment = (price * apr) / (1 - Math.pow(1 + apr, -termInMonths))
      return monthlyPayment.toFixed(2)
    }

    const closeModal = () => {
      emit('close-modal')
    }

    const submitPurchase = () => {
      // Handle form submission logic here
      console.log('Purchase Form Submitted:', purchaseForm.value)
      alert('Thank you for your inquiry! We will contact you shortly.')
      closeModal()
    }

    return {
      showModal,
      activeTab,
      tabs,
      purchaseForm,
      calculateMonthlyPayment,
      closeModal,
      submitPurchase,
    }
  },
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Properties</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="car in cars"
        :key="car.id"
        class="bg-white/90 dark:bg-gray-800/50 backdrop-blur rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-300 shadow-lg"
      >
        <!-- Car details -->
        <div class="relative">
          <img :src="car.imageUrl" :alt="car.make" class="h-64 w-full object-cover" />
          <div class="absolute top-4 right-4 flex gap-2">
            <button
              @click="toggleFavorite"
              class="absolute top-4 left-4 bg-gray-200 dark:bg-gray-700 rounded-full p-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <svg
                v-if="product.isFavorite"
                class="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <svg
                v-else
                class="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <span class="bg-amber-500 text-black font-bold px-4 py-1 rounded-full">
              {{ car.year }}
            </span>
          </div>
        </div>

        <div class="p-2">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ car.make }} {{ car.model }}
            </h3>
            <div class="flex items-center gap-1">
              <span class="text-amber-500">★</span>
              <span class="text-gray-700 dark:text-gray-300">{{ car.rating }}</span>
            </div>
          </div>

          <!-- Key Performance Stats -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
              <span class="text-amber-600 dark:text-amber-500 text-sm">Power</span>
              <p class="font-bold text-gray-900 dark:text-white">{{ car.features[0] }}</p>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
              <span class="text-amber-600 dark:text-amber-500 text-sm">Acceleration</span>
              <p class="font-bold text-gray-900 dark:text-white">{{ car.features[1] }}</p>
            </div>
          </div>

          <p class="text-gray-600 dark:text-gray-300 mb-6">{{ car.description }}</p>

          <div class="flex justify-between items-center">
            <p class="font-bold text-gray-900 dark:text-white">
              {{ car.price }}
            </p>
            <div class="flex gap-2">
              <button
                @click="$emit('view-details', car)"
                class="bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg p-2 transition-colors ease-in-out duration-300 text-sm"
              >
                View Details
              </button>
              <!-- delete car btn -->
              <button
                @click="$emit('delete-car', car.id)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded-lg transition-colors ease-in-out duration-300 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <CarsModel v-if="selectedCar" :selectedProduct="selectedCar" @close-modal="closeModal" />
  </div>
</template>

<script>
import { ref } from 'vue'
import CarsModel from './CarsModel.vue'
// import { auth, db } from '@/config/firebase'
// import { doc, getDoc } from 'firebase/firestore'

export default {
  name: 'PropertiesList',
  components: {
    CarsModel,
  },
  props: {
    cars: {
      type: Array,
      required: true,
    },
  },
  emits: ['delete-car', 'toggle-favorite', 'view-details'],
  setup() {
    const selectedCar = ref(null)

    const openModal = (car) => {
      selectedCar.value = car
    }

    const closeModal = () => {
      selectedCar.value = null
    }

    return { selectedCar, openModal, closeModal }
  },
}
</script>

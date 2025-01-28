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
          <span
            class="absolute top-4 right-4 bg-amber-500 text-black font-bold px-4 py-1 rounded-full"
          >
            {{ car.year }}
          </span>
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
  emits: ['delete-car'],
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

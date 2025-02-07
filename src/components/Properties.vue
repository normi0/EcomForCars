<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Properties</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <CarsModel :cars="cars" :sort-by="sortBy" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useFetchCars } from '@/composables/useFetchCars' // Adjust the import path as needed
import CarsModel from './CarsModel.vue'

export default {
  name: 'PropertiesList',
  components: {
    CarsModel,
  },
  setup() {
    const sortBy = ref('price')
    const { cars, loading, error, fetchCars } = useFetchCars()

    onMounted(() => {
      fetchCars()
    })

    return {
      cars,
      sortBy,
      loading,
      error,
    }
  },
}
</script>

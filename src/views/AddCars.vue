<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add a New Car</h1>
    <form @submit.prevent="submitCar">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <!-- Make -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Make</label>
          <input
            v-model="car.make"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <!-- Model -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Model</label>
          <input
            v-model="car.model"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <!-- Year -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Year</label>
          <input
            v-model="car.year"
            type="number"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <!-- Price -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
          <input
            v-model="car.price"
            type="number"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
      </div>
      <!-- Submit Button -->
      <div class="mt-6">
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          Add Car
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'

export default {
  setup() {
    const router = useRouter()
    const car = ref({
      make: '',
      model: '',
      year: '',
      price: '',
    })

    const submitCar = async () => {
      try {
        const user = auth.currentUser
        if (!user) {
          alert('You must be logged in to add a car.')
          return
        }

        // Save car data to Firestore
        await setDoc(doc(db, 'users', user.uid, 'cars', Date.now().toString()), {
          ...car.value,
          createdAt: new Date(),
        })

        alert('Car added successfully!')
        router.push({ name: 'profile' }) // Redirect to profile page
      } catch (error) {
        console.error('Error adding car:', error)
        alert('Failed to add car')
      }
    }

    return {
      car,
      submitCar,
    }
  },
}
</script>

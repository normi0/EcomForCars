<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Wishlist</h2>

    <div
      v-if="favoritesCars.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="car in favoritesCars"
        :key="car.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      >
        <img
          :src="car.imageUrl || '/src/assets/images/gray.avif'"
          :alt="car.make + ' ' + car.model"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ car.make }} {{ car.model }}
            </h3>
            <button
              @click="removeFromFavorites(car)"
              class="text-2xl text-red-500 focus:outline-none transition-colors duration-200 hover:text-red-600"
            >
              ♥
            </button>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ car.year }}</p>
          <p class="text-lg font-bold text-amber-500 mt-2">{{ car.price }}</p>
          <div class="mt-4">
            <button
              @click="viewDetails(car)"
              class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <div class="text-gray-500 dark:text-gray-400">
        <p class="text-xl mb-4">Your wishlist is empty</p>
        <p class="text-sm">Add cars to your wishlist by clicking the heart icon on any car.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { auth, db } from '@/config/firebase'
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore'

export default {
  name: 'WishList',
  setup() {
    const toast = useToast()
    const favoritesCars = ref([])

    const fetchFavoriteCars = async () => {
      try {
        const user = auth.currentUser
        if (!user) return

        const userDoc = await getDoc(doc(db, 'users', user.uid))
        const favorites = userDoc.data()?.favorites || []

        if (favorites.length > 0) {
          const carDocs = await Promise.all(
            favorites.map((carId) => getDoc(doc(db, 'cars', carId))),
          )
          favoritesCars.value = carDocs
            .filter((doc) => doc.exists())
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
              isFavorite: true,
            }))
        } else {
          favoritesCars.value = []
        }
      } catch (error) {
        console.error('Error fetching favorite cars:', error)
        toast.error('Failed to load favorite cars')
      }
    }

    const removeFromFavorites = async (car) => {
      try {
        const user = auth.currentUser
        if (!user) {
          toast.error('You must be logged in to manage favorites.')
          return
        }

        const userRef = doc(db, 'users', user.uid)
        await updateDoc(userRef, {
          favorites: arrayRemove(car.id),
        })

        // Remove from local state
        favoritesCars.value = favoritesCars.value.filter((c) => c.id !== car.id)
        toast.success('Removed from favorites')
      } catch (error) {
        console.error('Error removing from favorites:', error)
        toast.error('Failed to remove from favorites')
      }
    }

    const viewDetails = (car) => {
      // Implement view details functionality
      console.log('View details for car:', car)
    }

    onMounted(() => {
      fetchFavoriteCars()
    })

    return {
      favoritesCars,
      removeFromFavorites,
      viewDetails,
    }
  },
}
</script>

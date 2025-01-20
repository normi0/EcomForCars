<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Wishlist</h1>
    <div v-if="wishlist.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in wishlist"
        :key="item.id"
        class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ item.make }} {{ item.model }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400">{{ item.year }} | ${{ item.price }}</p>
      </div>
    </div>
    <div v-else class="text-gray-600 dark:text-gray-400">Your wishlist is empty.</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db, auth } from '@/config/firebase'

export default {
  setup() {
    const wishlist = ref([])

    const fetchWishlist = async () => {
      const user = auth.currentUser
      if (!user) return

      const q = query(collection(db, 'users', user.uid, 'wishlist'))
      const querySnapshot = await getDocs(q)
      wishlist.value = querySnapshot.docs.map((doc) => doc.data())
    }

    onMounted(() => {
      fetchWishlist()
    })

    return {
      wishlist,
    }
  },
}
</script>

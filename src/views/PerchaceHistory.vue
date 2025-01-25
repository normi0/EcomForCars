<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Purchase History</h1>
    <div v-if="purchases.length > 0" class="space-y-4">
      <div
        v-for="purchase in purchases"
        :key="purchase.id"
        class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ purchase.item }}</h2>
        <p class="text-gray-600 dark:text-gray-400">${{ purchase.price }} | {{ purchase.date }}</p>
      </div>
    </div>
    <div v-else class="text-gray-600 dark:text-gray-400">No purchases found.</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { collection, query, getDocs } from 'firebase/firestore'
import { db, auth } from '@/config/firebase'

export default {
  setup() {
    const purchases = ref([])

    const fetchPurchases = async () => {
      const user = auth.currentUser
      if (!user) return

      const q = query(collection(db, 'users', user.uid, 'purchases'))
      const querySnapshot = await getDocs(q)
      purchases.value = querySnapshot.docs.map((doc) => doc.data())
    }

    onMounted(() => {
      fetchPurchases()
    })

    return {
      purchases,
    }
  },
}
</script>

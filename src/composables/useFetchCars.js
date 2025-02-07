// composables/useFetchCars.js
import { ref } from 'vue'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/config/firebase' // Adjust the import path as needed
import { getAuth } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { useToast } from 'vue-toastification' // Adjust the import path as needed
import { query } from 'firebase/firestore'
export const useFetchCars = () => {
  const cars = ref([])
  const loading = ref(false)
  const error = ref(null)
  const toast = useToast()

  const fetchCars = async () => {
    loading.value = true
    try {
      const carsQuery = query(collection(db, 'cars'))
      const querySnapshot = await getDocs(carsQuery)
      const user = getAuth().currentUser

      // If user is logged in, fetch their favorites
      let userFavorites = []
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        userFavorites = userDoc.data()?.favorites || []
      }

      cars.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        isFavorite: userFavorites.includes(doc.id),
      }))
    } catch (error) {
      console.error('Error fetching cars:', error)
      toast.error('Failed to load cars')
    } finally {
      loading.value = false
    }
  }

  return {
    cars,
    loading,
    error,
    fetchCars,
  }
}

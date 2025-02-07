// composables/useFetchCars.js
import { ref } from 'vue'
import { getDocs, collection, doc, getDoc } from 'firebase/firestore'
import { db } from '@/config/firebase' // Adjust the import path as needed
import { getAuth } from 'firebase/auth'
import { useToast } from 'vue-toastification' // Adjust the import path as needed

export const userCarsFetch = () => {
  const cars = ref([])
  const loading = ref(false)
  const error = ref(null)
  const toast = useToast()

  const fetchCars = async () => {
    loading.value = true
    try {
      const auth = getAuth()
      const user = auth.currentUser

      if (!user) {
        throw new Error('User not logged in')
      }

      // Fetch the user's document to get the carReferences array
      const userDocRef = doc(db, 'users', user.uid)
      const userDocSnapshot = await getDoc(userDocRef)

      if (!userDocSnapshot.exists()) {
        throw new Error('User document not found')
      }

      const userData = userDocSnapshot.data()
      const carReferences = userData.carReferences || [] // Array of car IDs (strings)

      // Fetch the car documents for each car ID in carReferences
      const carsData = []
      for (const carId of carReferences) {
        const carDocRef = doc(db, 'cars', carId) // Construct the document reference
        const carDocSnapshot = await getDoc(carDocRef)

        if (carDocSnapshot.exists()) {
          carsData.push({
            id: carDocSnapshot.id,
            ...carDocSnapshot.data(),
          })
        }
      }

      cars.value = carsData
    } catch (err) {
      console.error('Error fetching cars:', err)
      toast.error('Failed to load cars')
      error.value = err.message
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

import { doc, updateDoc, arrayUnion, arrayRemove, deleteDoc, getDoc } from 'firebase/firestore'
import { db, auth } from '@/config/firebase'
import { getAuth } from 'firebase/auth'
import { useToast } from 'vue-toastification' // Assuming you're using vue-toastification for notifications
import { ref } from 'vue'

const toast = useToast()

// Toggle favorite function
export const toggleFavorite = async (carId, isFavorite) => {
  try {
    const user = getAuth().currentUser
    if (!user) {
      throw new Error('Please login to add to wishlist')
    }

    const userRef = doc(db, 'users', user.uid)
    const operation = isFavorite ? arrayRemove : arrayUnion

    await updateDoc(userRef, {
      favorites: operation(carId),
    })

    return true
  } catch (error) {
    console.error('Error toggling favorite:', error)
    throw error
  }
}

// Delete car function
export const deleteCar = async (carId) => {
  try {
    const user = auth.currentUser
    if (!user) {
      toast.error('You must be logged in to delete a car.')
      return
    }

    // Confirm deletion

    // 1. Delete the car document from the "cars" collection
    const carRef = doc(db, 'cars', carId)
    await deleteDoc(carRef)

    // 2. Remove the car reference from the user's "carReferences" array
    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, {
      carReferences: arrayRemove(carId), // Remove the car ID from the array
    })

    // Notify success
    toast.success('Car deleted successfully!')
    return true // Indicate success
  } catch (error) {
    console.error('Error deleting car:', error)
    toast.error('Failed to delete car. Please try again.')
    throw error
  }
}

// Fetch cars function
export const fetchCars = async () => {
  const cars = ref([]) // Local state for cars

  try {
    const user = auth.currentUser
    if (!user) {
      toast.error('You must be logged in to view cars.')
      return cars
    }

    const userDoc = await getDoc(doc(db, 'users', user.uid))
    const carReferences = userDoc.data()?.carReferences || []

    if (carReferences.length > 0) {
      const carDocs = await Promise.all(
        carReferences.map((carId) => getDoc(doc(db, 'cars', carId))),
      )
      cars.value = carDocs
        .filter((doc) => doc.exists())
        .map((doc) => ({ id: doc.id, ...doc.data() }))
    } else {
      cars.value = []
    }
  } catch (error) {
    console.error('Error fetching cars:', error)
    toast.error('Failed to fetch cars')
  }

  return cars
}

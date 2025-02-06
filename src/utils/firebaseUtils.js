import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { getAuth } from 'firebase/auth'

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

export const deleteCar = async (carId) => {
  try {
    const user = getAuth().currentUser
    if (!user) {
      throw new Error('Please login to delete car')
    }

    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, {
      favorites: arrayRemove(carId),
    })

    return true
  } catch (error) {
    console.error('Error deleting car:', error)
    throw error
  }
}

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Cover Photo Section -->
    <div class="h-64 w-full relative">
      <img
        :src="coverPhotoUrl ?? '/src/assets/images/gray.avif'"
        alt="Cover"
        class="w-full h-full object-cover"
      />
      <!-- Change Cover Button (Bottom-Right Corner) -->
      <div class="absolute bottom-4 right-4">
        <label
          for="cover-photo-upload"
          class="cursor-pointer bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70"
        >
          Change Cover
        </label>
        <input
          id="cover-photo-upload"
          type="file"
          accept="image/*"
          class="hidden"
          @change="uploadCoverPhoto"
        />
      </div>
    </div>

    <!-- Profile Section -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative -mt-24">
        <!-- Profile Picture -->
        <div class="relative inline-block">
          <img
            :src="profilePhotoUrl || '/default-avatar.jpg'"
            alt="Profile"
            class="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
          />
          <label
            for="profile-photo-upload"
            class="relative bottom-12 left-24 cursor-pointer bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 h-fit w-fit flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </label>
          <input
            id="profile-photo-upload"
            type="file"
            accept="image/*"
            class="hidden"
            @change="uploadProfilePhoto"
          />
        </div>

        <!-- User Info -->
        <div class="mt-4">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ userDisplayName || 'User Name' }}
          </h1>
          <p class="text-gray-600 dark:text-gray-400">{{ userEmail }}</p>
        </div>
      </div>
    </div>

    <!-- Navigation Bar -->
    <div class="bg-white dark:bg-gray-800 shadow-sm mt-8 sticky top-0 z-10">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row justify-start gap-6 py-3">
          <!-- Add Cars Button -->
          <button
            @click="mode = 'addCars'"
            class="text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-500 font-medium transition-colors"
            :class="{ 'text-amber-500 dark:text-amber-500': mode === 'addCars' }"
          >
            Add Cars
          </button>
          <!-- Wishlist Button -->
          <button
            @click="mode = 'wishList'"
            class="text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-500 font-medium transition-colors"
            :class="{ 'text-amber-500 dark:text-amber-500': mode === 'wishList' }"
          >
            Wishlist
          </button>
          <!-- Properties Button -->
          <button
            @click="mode = 'properties'"
            class="text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-500 font-medium transition-colors"
            :class="{ 'text-amber-500 dark:text-amber-500': mode === 'properties' }"
          >
            Properties
          </button>
          <!-- Purchase History Button -->
          <button
            @click="mode = 'purchaseHistory'"
            class="text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-500 font-medium transition-colors"
            :class="{ 'text-amber-500 dark:text-amber-500': mode === 'purchaseHistory' }"
          >
            Purchase History
          </button>
        </div>
      </div>
    </div>

    <!-- Dynamic Component Rendering -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="mode === 'addCars'">
        <AddCars @car-added="fetchUserCars" />
      </div>
      <div v-else-if="mode === 'wishList'">
        <WishList />
      </div>
      <div v-else-if="mode === 'properties'">
        <Properties />
      </div>
      <div v-else-if="mode === 'purchaseHistory'">
        <PurchaseHistory />
      </div>

      <!-- Display User's Cars -->
      <div
        v-if="mode === 'properties'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="car in cars"
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
                @click="toggleFavorite(car)"
                class="text-2xl focus:outline-none transition-colors duration-200"
                :class="{
                  'text-red-500': car.isFavorite,
                  'text-gray-400 hover:text-red-500': !car.isFavorite,
                }"
              >
                ♥
              </button>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ car.year }}</p>
            <p class="text-lg font-bold text-amber-500 mt-2">{{ car.price }}</p>
            <div class="flex justify-between items-center mt-4">
              <button
                @click="deleteCar(car.id)"
                class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
              >
                Delete
              </button>
              <button
                @click="openModal(car)"
                class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <CarModal v-if="showModal" :selectedProduct="selectedCar" @close-modal="closeModal" />
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore'
import { db, auth } from '@/config/firebase'
import { updateProfile } from 'firebase/auth'
import AddCars from './AddCars.vue'
import WishList from '../views/WishList.vue'
import PurchaseHistory from '../views/PerchaceHistory.vue'
import CarModal from '../components/CarsModel.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

// Example function to upload images to Cloudinary
const uploadImage = async (file, uploadPreset, publicId = null) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  if (publicId) {
    formData.append('public_id', publicId)
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    )
    return await response.json()
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export default {
  name: 'ProfileView',
  components: {
    AddCars,
    WishList,
    PurchaseHistory,
    CarModal,
  },
  methods: {
    // Delete car from Firestore
    async deleteCar(carId) {
      try {
        const user = auth.currentUser
        if (!user) {
          toast.error('You must be logged in to delete a car.')
          return
        }

        // Delete the car document from Firestore
        const carRef = doc(db, 'cars', carId)
        await deleteDoc(carRef)

        // Update user's carReferences using arrayRemove
        const userRef = doc(db, 'users', user.uid)
        await updateDoc(userRef, {
          carReferences: arrayRemove(carId),
        })

        // Remove the car from the local list
        this.cars = this.cars.filter((car) => car.id !== carId)

        toast.success('Car deleted successfully!')
      } catch (error) {
        console.error('Error deleting car:', error)
        toast.error('Failed to delete car: ' + error.message)
      }
    },
    async toggleFavorite(car) {
      try {
        const user = auth.currentUser
        if (!user) {
          toast.error('You must be logged in to add favorites.')
          return
        }

        const userRef = doc(db, 'users', user.uid)
        const userDoc = await getDoc(userRef)
        const favorites = userDoc.data()?.favorites || []

        if (favorites.includes(car.id)) {
          // Remove from favorites
          await updateDoc(userRef, {
            favorites: arrayRemove(car.id),
          })
          car.isFavorite = false
          toast.success('Removed from favorites')
        } else {
          // Add to favorites
          await updateDoc(userRef, {
            favorites: arrayUnion(car.id),
          })
          car.isFavorite = true
          toast.success('Added to favorites')
        }
      } catch (error) {
        console.error('Error toggling favorite:', error)
        toast.error('Failed to update favorites')
      }
    },
  },
  setup() {
    const user = ref(null)
    const profilePhotoUrl = ref('')
    const coverPhotoUrl = ref('')
    const userDisplayName = ref('')
    const userEmail = ref('')
    const mode = ref('properties') // Set default mode to 'properties'
    const cars = ref([])
    const showModal = ref(false)
    const selectedCar = ref(null)

    // Fetch user data from Firestore
    const fetchUserData = async (currentUser) => {
      const docRef = doc(db, 'users', currentUser.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        profilePhotoUrl.value = data.photoURL || '/default-avatar.jpg'
        coverPhotoUrl.value = data.coverPhotoUrl || '/src/assets/images/gray.avif'
      } else {
        console.log('No such document!')
        profilePhotoUrl.value = '/default-avatar.jpg'
        coverPhotoUrl.value = '/src/assets/images/gray.avif'
      }
    }

    // Upload profile photo
    const uploadProfilePhoto = async (event) => {
      const file = event.target.files[0]
      if (!file) return

      const currentUser = user.value
      if (!currentUser) return

      try {
        // Upload image to Cloudinary
        const uploadResult = await uploadImage(file, 'profile_photo_preset')
        const downloadURL = uploadResult.secure_url

        // Save profile photo URL to Firestore
        await setDoc(doc(db, 'users', currentUser.uid), { photoURL: downloadURL }, { merge: true })

        // Update Firebase Auth profile
        await updateProfile(currentUser, {
          photoURL: downloadURL,
        })

        // Update local state
        profilePhotoUrl.value = downloadURL
      } catch (error) {
        console.error('Error uploading profile photo:', error)
        toast.error('Failed to upload profile photo')
      }
    }

    // Upload cover photo
    const uploadCoverPhoto = async (event) => {
      const file = event.target.files[0]
      if (!file) {
        console.log('No file selected.')
        return
      }

      const currentUser = user.value
      if (!currentUser) {
        console.log('No user logged in.')
        return
      }

      try {
        console.log('Uploading cover photo to Cloudinary...')
        const uploadResult = await uploadImage(
          file,
          import.meta.env.VITE_CLOUDINARY_COVER_UPLOAD_PRESET,
          `users/cover_photos/${currentUser.uid}`,
        )
        const downloadURL = uploadResult.secure_url
        console.log('Cover photo uploaded. URL:', downloadURL)

        await setDoc(
          doc(db, 'users', currentUser.uid),
          { coverPhotoUrl: downloadURL },
          { merge: true },
        )
        console.log('Firestore updated successfully.')

        coverPhotoUrl.value = downloadURL
        console.log('Local state updated with new cover photo URL.')
      } catch (error) {
        console.error('Error uploading cover photo:', error)
        toast.error('Failed to upload cover photo')
        coverPhotoUrl.value = '/src/assets/images/gray.avif'
      }
    }

    // Fetch user's cars from Firestore
    const fetchUserCars = async () => {
      try {
        const user = auth.currentUser
        if (!user) return

        const userDoc = await getDoc(doc(db, 'users', user.uid))
        const favorites = userDoc.data()?.favorites || []
        const carReferences = userDoc.data()?.carReferences || []

        if (carReferences.length > 0) {
          const carDocs = await Promise.all(
            carReferences.map((carId) => getDoc(doc(db, 'cars', carId))),
          )
          cars.value = carDocs
            .filter((doc) => doc.exists())
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
              isFavorite: favorites.includes(doc.id),
            }))
        } else {
          cars.value = []
        }
      } catch (error) {
        console.error('Error fetching user cars:', error)
        toast.error('Failed to fetch user cars')
      }
    }

    // Open modal with car details
    const openModal = (car) => {
      selectedCar.value = car
      showModal.value = true
    }

    // Close modal
    const closeModal = () => {
      showModal.value = false
    }

    onMounted(async () => {
      const currentUser = auth.currentUser
      if (currentUser) {
        user.value = currentUser
        userDisplayName.value = currentUser.displayName
        userEmail.value = currentUser.email

        await fetchUserData(currentUser)
        await fetchUserCars()
      }
    })

    return {
      profilePhotoUrl,
      coverPhotoUrl,
      userDisplayName,
      userEmail,
      mode,
      cars,
      showModal,
      selectedCar,
      fetchUserCars,
      openModal,
      closeModal,
      uploadProfilePhoto,
      uploadCoverPhoto,
    }
  },
}
</script>

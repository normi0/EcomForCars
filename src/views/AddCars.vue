<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add a New Car</h1>
    <form @submit.prevent="submitCar">
      <!-- Existing form fields for adding a car -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <!-- Make -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Make</label>
          <input
            v-model="car.make"
            type="text"
            required
            class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500 p-1 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          />
        </div>

        <!-- Model -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Model</label>
          <input
            v-model="car.model"
            type="text"
            required
            class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500 p-1 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          />
        </div>

        <!-- Year -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Year</label>
          <input
            v-model="car.year"
            type="number"
            required
            class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500 p-1 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          />
        </div>

        <!-- Price -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
          <input
            v-model="car.price"
            v-money="moneyConfig"
            type="text"
            required
            class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500 p-1 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          />
        </div>

        <!-- Rating -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label>
          <div class="star-rating mt-1">
            <span
              v-for="star in 5"
              :key="star"
              :class="['star', { active: star <= car.rating }]"
              @click="car.rating = star"
              @mouseover="hoverRating = star"
              @mouseleave="hoverRating = null"
            >
              ★
            </span>
          </div>
        </div>

        <!-- Features -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Power</label>
          <input
            v-model="car.features[0]"
            type="text"
            required
            class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500 p-1 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Acceleration</label
          >
          <input
            v-model="car.features[1]"
            type="text"
            required
            class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500 p-1 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          />
        </div>

        <!-- Description -->
        <div class="sm:col-span-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Description</label
          >
          <textarea
            v-model="car.description"
            required
            class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500 p-1 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          ></textarea>
        </div>

        <!-- Specifications -->
        <div class="sm:col-span-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 text-[16px] font-semibold mb-2"
            >Specifications</label
          >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Engine</label
              >
              <input
                v-model="car.specifications.engine"
                type="text"
                required
                class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500 p-1 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Transmission</label
              >
              <input
                v-model="car.specifications.transmission"
                type="text"
                required
                class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500 p-1 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Drivetrain</label
              >
              <input
                v-model="car.specifications.drivetrain"
                type="text"
                required
                class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500 p-1 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Fuel Type</label
              >
              <input
                v-model="car.specifications.fuelType"
                type="text"
                required
                class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500 p-1 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              />
            </div>
          </div>
        </div>

        <!-- Financing Options -->
        <div class="sm:col-span-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 text-[16px] font-semibold mb-2"
            >Financing Options</label
          >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >APR (%)</label
              >
              <input
                v-model="car.financing.apr"
                type="number"
                step="0.01"
                required
                class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500 p-1 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Term Length (months)</label
              >
              <input
                v-model="car.financing.termLength"
                type="number"
                required
                class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500 p-1 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              />
            </div>
          </div>
        </div>

        <!-- Car Image Upload -->
        <div class="sm:col-span-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Car Image
          </label>
          <div class="relative">
            <div
              class="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-amber-500 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <input
                type="file"
                @change="handleImageUpload"
                accept="image/*"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span class="text-gray-500 dark:text-gray-400 text-sm">
                Click to upload or drag and drop
              </span>
            </div>
          </div>
          <!-- Image Preview -->
          <div v-if="car.imagePreviewUrl" class="mt-4">
            <img
              :src="car.imagePreviewUrl"
              alt="Car Image Preview"
              class="w-48 h-48 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow"
            />
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="mt-6">
        <button
          type="submit"
          class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200"
        >
          Add Car
        </button>
      </div>
    </form>

    <!-- List of Cars with Delete Button -->
    <div class="mt-8">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Cars</h2>
      <div v-if="cars.length > 0" class="space-y-4">
        <div v-for="car in cars" :key="car.id" class="p-4 border rounded-lg shadow-sm">
          <h3 class="text-lg font-semibold">{{ car.make }} {{ car.model }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ car.year }}</p>
          <button
            @click="deleteCar(car.id)"
            class="mt-2 inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </div>
      <p v-else class="text-gray-600 dark:text-gray-400">No cars added yet.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  documentId,
} from 'firebase/firestore'
import { db, auth } from '@/config/firebase'
import { VMoney } from 'v-money3'

export default {
  name: 'AddCars',
  directives: { money: VMoney },
  emits: ['car-added', 'car-deleted'],
  setup(props, { emit }) {
    const router = useRouter()
    const car = ref({
      marke: '',
      model: '',
      year: '',
      price: '',
      rating: 0,
      features: ['', ''], // Power and Acceleration
      description: '',
      specifications: {
        engine: '',
        transmission: '',
        drivetrain: '',
        fuelType: '',
      },
      financing: {
        apr: 0, // Annual Percentage Rate
        termLength: 0, // Loan term in months
      },
      imageUrl: '', // To store the uploaded image URL
      imagePreviewUrl: '', // To display the image preview
    })

    const cars = ref([]) // Array to store the list of cars
    const moneyConfig = ref({
      decimal: '.',
      thousands: ',',
      prefix: '$ ',
      suffix: '',
      precision: 2,
      masked: false,
    })

    // Fetch cars from Firestore
    const fetchCars = async () => {
      const user = auth.currentUser
      if (!user) {
        alert('You must be logged in to view cars.')
        return
      }
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      const carIds = userDoc.data()?.cars || []
      if (carIds.length) {
        const carQuery = query(collection(db, 'cars'), where(documentId(), 'in', carIds))
        const carSnapshot = await getDocs(carQuery)
        cars.value = carSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      } else {
        cars.value = []
      }
    }

    // Handle image upload
    const handleImageUpload = async (event) => {
      const file = event.target.files[0]
      if (!file) return

      // Display image preview
      car.value.imagePreviewUrl = URL.createObjectURL(file)

      try {
        // Upload image to Cloudinary
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'car_image_preset') // Use your Cloudinary upload preset
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Failed to upload image')
        }

        const data = await response.json()
        car.value.imageUrl = data.secure_url // Save the image URL
      } catch (error) {
        console.error('Error uploading image:', error)
        alert('Failed to upload image')
      }
    }

    // Submit car data
    const submitCar = async () => {
      try {
        const user = auth.currentUser
        if (!user) {
          alert('You must be logged in to add a car.')
          return
        }

        // Generate a unique document ID for the car
        const carRef = doc(collection(db, 'cars'))
        const carId = carRef.id

        // Save car data to Firestore
        await setDoc(carRef, {
          make: car.value.make,
          model: car.value.model,
          year: car.value.year,
          price: car.value.price,
          imageUrl: car.value.imageUrl,
          rating: car.value.rating,
          features: car.value.features,
          description: car.value.description,
          specifications: car.value.specifications,
          financing: car.value.financing,
          createdAt: new Date(),
        })

        const userRef = doc(db, 'users', user.uid)
        await setDoc(
          userRef,
          { carReferences: [...((await getDoc(userRef)).data()?.carReferences || []), carId] },
          { merge: true },
        )

        alert('Car added successfully!')
        emit('car-added') // Emit event to refresh the car list
        fetchCars() // Refresh the list of cars
        router.push({ name: 'profile' }) // Redirect to profile page
      } catch (error) {
        console.error('Error adding car:', error)
        alert('Failed to add car')
      }
    }

    // Delete car
    const deleteCar = async (carId) => {
      try {
        const user = auth.currentUser
        if (!user) {
          alert('You must be logged in to delete a car.')
          return
        }

        // Delete the car document from Firestore
        await deleteDoc(doc(db, 'cars', carId))
        // Update user car reference to remove this car ID
        const userRef = doc(db, 'users', user.uid)
        const userDoc = await getDoc(userRef)
        const updatedReferences = userDoc.data().carReferences.filter((ref) => ref !== carId)
        await setDoc(userRef, { carReferences: updatedReferences }, { merge: true })
        alert('Car deleted successfully!')
        emit('car-deleted') // Emit event to refresh the car list
        fetchCars() // Refresh the list of cars
      } catch (error) {
        console.error('Error deleting car:', error)
        alert('Failed to delete car')
      }
    }

    // Fetch cars when the component is mounted
    onMounted(() => {
      fetchCars()
    })

    return {
      car,
      cars,
      moneyConfig,
      handleImageUpload,
      submitCar,
      deleteCar,
    }
  },
}
</script>

<style scoped>
/* Custom Star Rating Styles */
.star-rating {
  display: inline-flex;
  gap: 4px;
}

.star {
  cursor: pointer;
  font-size: 24px;
  color: #ccc; /* Inactive star color */
  transition: color 0.2s;
}

.star.active {
  color: #ffc107; /* Active star color */
}

.star:hover {
  color: #ffc107; /* Hover star color */
}

/* Enhanced Input Fields */
input,
textarea {
  font-size: 16px; /* Larger font size */
  padding: 12px; /* More padding for better spacing */
}

/* Dark Mode Visibility Improvements */
.dark input,
.dark textarea {
  background-color: #374151; /* Darker background for better contrast */
  color: #f3f4f6; /* Light text for better visibility */
}

.dark input:focus,
.dark textarea:focus {
  border-color: #f59e0b; /* Amber focus border for dark mode */
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2); /* Amber focus ring */
}

/* Hover Effects */
input:hover,
textarea:hover,
.file-upload:hover {
  background-color: #f9fafb; /* Light gray background on hover */
  border-color: #f59e0b; /* Amber border on hover */
}

.dark input:hover,
.dark textarea:hover,
.dark .file-upload:hover {
  background-color: #4b5563; /* Darker gray background on hover in dark mode */
  border-color: #f59e0b; /* Amber border on hover in dark mode */
}
</style>

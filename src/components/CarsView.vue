<template>
  <div>
    <!-- Add Car Form -->
    <AddCars @car-added="handleCarAdded" />

    <!-- Display Cars -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <div
        v-for="car in cars"
        :key="car.id"
        class="bg-white/90 dark:bg-gray-800/50 backdrop-blur rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-300 shadow-lg"
      >
        <div class="relative">
          <img :src="car.imageUrl" :alt="car.make" class="h-64 w-full object-cover" />
          <span
            class="absolute top-4 right-4 bg-amber-500 text-black font-bold px-4 py-1 rounded-full"
          >
            {{ car.year }}
          </span>
        </div>

        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ car.make }} {{ car.model }}
            </h3>
            <div class="flex items-center gap-1">
              <span class="text-amber-500">★</span>
              <span class="text-gray-700 dark:text-gray-300">{{ car.rating }}</span>
            </div>
          </div>

          <!-- Key Performance Stats -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
              <h3 class="text-amber-600 dark:text-amber-500 text-sm">Power</h3>
              <p class="font-bold text-gray-900 dark:text-white">{{ car.features[0] }}</p>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
              <h3 class="text-amber-600 dark:text-amber-500 text-sm">Acceleration</h3>
              <p class="font-bold text-gray-900 dark:text-white">{{ car.features[1] }}</p>
            </div>
          </div>

          <p class="text-gray-600 dark:text-gray-300 mb-6">{{ car.description }}</p>

          <div class="flex justify-between items-center">
            <span class="text-2xl font-bold text-gray-900 dark:text-white"
              >${{ car.price.toLocaleString() }}</span
            >
            <button
              @click="openModal(car)"
              class="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-2 rounded-full transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <CarModal v-if="showModal" :selectedProduct="selectedCar" @close-modal="closeModal" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { doc, setDoc } from 'firebase/firestore'
import { db, auth } from '@/config/firebase'
import { VMoney } from 'v-money3'

export default {
  name: 'AddCars',
  directives: { money: VMoney },
  emits: ['car-added'],
  setup(props, { emit }) {
    const router = useRouter()
    const car = ref({
      make: '',
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

    const moneyConfig = ref({
      decimal: '.',
      thousands: ',',
      prefix: '$ ',
      suffix: '',
      precision: 2,
      masked: false,
    })

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
        const carId = Date.now().toString()

        // Save car data to Firestore
        await setDoc(doc(db, 'users', user.uid, 'cars', carId), {
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

        alert('Car added successfully!')
        emit('car-added', {
          id: carId,
          ...car.value,
        })
        router.push({ name: 'profile' }) // Redirect to profile page
      } catch (error) {
        console.error('Error adding car:', error)
        alert('Failed to add car')
      }
    }

    return {
      car,
      moneyConfig,
      handleImageUpload,
      submitCar,
    }
  },
}
</script>

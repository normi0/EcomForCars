<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Cover Photo Section -->
    <div class="relative h-64 w-full">
      <img
        :src="coverPhotoUrl || '/default-cover.jpg'"
        alt="Cover"
        class="w-full h-full object-cover"
      />
      <div class="absolute bottom-4 right-4">
        <label
          class="cursor-pointer bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70"
        >
          <input type="file" accept="image/*" class="hidden" @change="uploadCoverPhoto" />
          Change Cover
        </label>
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
            class="absolute bottom-0 right-0 cursor-pointer bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
          >
            <input type="file" accept="image/*" class="hidden" @change="uploadProfilePhoto" />
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
  </div>
</template>

<script>
import { uploadImage } from '@/utils/cloudinary'
import { ref, onMounted } from 'vue'
import { getAuth, updateProfile } from 'firebase/auth'
import { app } from '@/config/firebase'

export default {
  name: 'ProfileView',
  setup() {
    const user = ref(null)
    const auth = getAuth(app)
    const profilePhotoUrl = ref('')
    const coverPhotoUrl = ref('')
    const userDisplayName = ref('')
    const userEmail = ref('')

    onMounted(async () => {
      const currentUser = auth.currentUser
      if (currentUser) {
        user.value = currentUser
        userDisplayName.value = currentUser.displayName
        userEmail.value = currentUser.email
        profilePhotoUrl.value = currentUser.photoURL

        // Try to load existing cover photo
        try {
          const coverPhotoPublicId = `users/${currentUser.uid}/cover`
          coverPhotoUrl.value = getOptimizedImageUrl(coverPhotoPublicId)
        } catch (error) {
          console.log('Error fetching cover photo URL from Cloudinary:', error)
          coverPhotoUrl.value = '/default-cover.jpg'
        }
      }
    })

    const getOptimizedImageUrl = (publicId) => {
      return `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/w_1000,h_1000,c_fill/${publicId}`
    }

    const uploadProfilePhoto = async (event) => {
      const file = event.target.files[0]
      if (!file) return

      const currentUser = user.value
      if (!currentUser) return

      try {
        // Use the profile photo upload preset
        const uploadResult = await uploadImage(file, 'profile_photo_preset')
        const downloadURL = uploadResult.secure_url

        // Update user profile
        await updateProfile(currentUser, {
          photoURL: downloadURL,
        })

        profilePhotoUrl.value = downloadURL
      } catch (error) {
        console.error('Error uploading profile photo:', error)
        alert('Failed to upload profile photo')
      }
    }

    const uploadCoverPhoto = async (event) => {
      const file = event.target.files[0]
      if (!file) return

      const currentUser = user.value
      if (!currentUser) return

      try {
        // Use the cover photo upload preset
        const uploadResult = await uploadImage(file, 'cover_photo_preset')
        const downloadURL = uploadResult.secure_url
        coverPhotoUrl.value = downloadURL
      } catch (error) {
        console.error('Error uploading cover photo:', error)
        alert('Failed to upload cover photo')
      }
    }

    return {
      profilePhotoUrl,
      coverPhotoUrl,
      userDisplayName,
      userEmail,
      uploadCoverPhoto,
      uploadProfilePhoto,
    }
  },
}
</script>

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
          class="cursor-pointer bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70"
        >
          Change Cover
          <input type="file" accept="image/*" class="hidden" @change="uploadCoverPhoto" />
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
            class="relative bottom-12 left-24 cursor-pointer bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 h-fit w-fit flex items-center justify-center"
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

    <!-- Navigation Bar -->
    <div class="bg-white dark:bg-gray-800 shadow-sm mt-8 sticky top-0 z-10">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row justify-start gap-6 py-3">
          <!-- Add Cars Button -->
          <router-link
            @click="navigateTo('add-cars')"
            class="text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-500 font-medium transition-colors"
            active-class="text-amber-500 dark:text-amber-500"
          >
            Add Cars
          </router-link>
          <!-- Wishlist router-link -->
          <router-link
            @click="navigateTo('wishlist')"
            class="text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-500 font-medium transition-colors"
            active-class="text-amber-500 dark:text-amber-500"
          >
            Wishlist
          </router-link>
          <!-- Purchase History router-link -->
          <router-link
            @click="navigateTo('purchase-history')"
            class="text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-500 font-medium transition-colors"
            active-class="text-amber-500 dark:text-amber-500"
          >
            Purchase History
          </router-link>
        </div>
      </div>
    </div>
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { uploadImage } from '@/utils/cloudinary'
import { ref, onMounted } from 'vue'
import { updateProfile } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db, auth } from '@/config/firebase'

export default {
  name: 'ProfileView',

  setup() {
    const router = useRouter()
    const user = ref(null)
    const profilePhotoUrl = ref('')
    const coverPhotoUrl = ref('')
    const userDisplayName = ref('')
    const userEmail = ref('')

    // Fetch user data from Firestore
    const fetchUserData = async (currentUser) => {
      const docRef = doc(db, 'users', currentUser.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        profilePhotoUrl.value = data.photoURL || '/default-avatar.jpg' // Fallback to default profile photo
        coverPhotoUrl.value = data.coverPhotoUrl || '/src/assets/images/gray.avif' // Fallback to default cover photo
      } else {
        console.log('No such document!')
        // Set default images if no document exists
        profilePhotoUrl.value = '/default-avatar.jpg'
        coverPhotoUrl.value = '/src/assets/images/gray.avif'
      }
    }

    onMounted(async () => {
      const currentUser = auth.currentUser
      if (currentUser) {
        user.value = currentUser
        userDisplayName.value = currentUser.displayName
        userEmail.value = currentUser.email

        // Fetch user data from Firestore
        await fetchUserData(currentUser)
      }
    })

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
        await setDoc(
          doc(db, 'users', currentUser.uid),
          { photoURL: downloadURL },
          { merge: true }, // Merge with existing document
        )

        // Update Firebase Auth profile
        await updateProfile(currentUser, {
          photoURL: downloadURL,
        })

        // Update local state
        profilePhotoUrl.value = downloadURL
      } catch (error) {
        console.error('Error uploading profile photo:', error)
        alert('Failed to upload profile photo')
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
        // Upload image to Cloudinary
        const uploadResult = await uploadImage(
          file,
          import.meta.env.VITE_CLOUDINARY_COVER_UPLOAD_PRESET,
          `users/cover_photos/${currentUser.uid}`, // Public ID
        )
        const downloadURL = uploadResult.secure_url

        // Save cover photo URL to Firestore
        await setDoc(
          doc(db, 'users', currentUser.uid),
          { coverPhotoUrl: downloadURL },
          { merge: true }, // Merge with existing document
        )

        // Update local state
        coverPhotoUrl.value = downloadURL
      } catch (error) {
        console.error('Error uploading cover photo:', error)
        alert('Failed to upload cover photo')
        coverPhotoUrl.value = '/src/assets/images/gray.avif' // Fallback to default cover photo
      }
    }

    // Navigate to a route
    const navigateTo = (route) => {
      router.push({ name: route })
    }

    return {
      profilePhotoUrl,
      coverPhotoUrl,
      userDisplayName,
      userEmail,
      uploadCoverPhoto,
      uploadProfilePhoto,
      navigateTo,
    }
  },
}
</script>

<style scoped>
/* Ensure the label is clickable */
label {
  position: relative;
  z-index: 1; /* Ensure it's above other elements */
  pointer-events: auto; /* Ensure it's clickable */
}

/* Ensure the input is hidden but functional */
input[type='file'] {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
}
</style>

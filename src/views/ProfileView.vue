<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Cover Photo Section -->
    <div class="relative h-80 bg-gray-300 dark:bg-gray-800">
      <img
        :src="profile.coverPhoto || '/src/assets/images/default-cover.jpg'"
        alt="Cover"
        class="w-full h-full object-cover"
      />
      <button
        @click="triggerCoverUpload"
        class="absolute bottom-4 right-4 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-white"
      >
        <svg
          class="w-5 h-5 inline-block mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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
        Change Cover
      </button>
      <input
        ref="coverInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleCoverUpload"
      />
    </div>

    <!-- Profile Info Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative -mt-24 sm:-mt-32 mb-6">
        <div
          class="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <!-- Profile Picture -->
          <div class="relative">
            <div
              class="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-700"
            >
              <img
                :src="profile.avatar || '/src/assets/images/default-avatar.jpg'"
                alt="Profile"
                class="w-full h-full object-cover"
              />
            </div>
            <button
              @click="triggerProfileUpload"
              class="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <svg
                class="w-5 h-5 text-gray-700 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
            </button>
            <input
              ref="profileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleProfileUpload"
            />
          </div>

          <!-- Profile Info -->
          <div class="flex-1 text-center sm:text-left">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ profile.name }}</h1>
            <p class="text-gray-600 dark:text-gray-400">{{ profile.email }}</p>
          </div>

          <!-- Edit Profile Button -->
          <button
            @click="showEditModal = true"
            class="px-6 py-2 bg-black dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav class="flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="currentTab = tab.id"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap',
              currentTab === tab.id
                ? 'border-black text-black dark:border-white dark:text-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="mb-8">
        <!-- Products Tab -->
        <div
          v-if="currentTab === 'products'"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="product in userProducts"
            :key="product.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <img :src="product.image" :alt="product.title" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ product.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mt-1">{{ product.price }}</p>
            </div>
          </div>
        </div>

        <!-- Wishlist Tab -->
        <div
          v-if="currentTab === 'wishlist'"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="item in wishlist"
            :key="item.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <img :src="item.image" :alt="item.title" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ item.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mt-1">{{ item.price }}</p>
            </div>
          </div>
        </div>

        <!-- Orders Tab -->
        <div v-if="currentTab === 'orders'" class="space-y-4">
          <div
            v-for="order in orders"
            :key="order.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Order #{{ order.id }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400">{{ order.date }}</p>
              </div>
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  order.status === 'Delivered'
                    ? 'bg-green-100 text-green-800'
                    : order.status === 'Processing'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800',
                ]"
              >
                {{ order.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Settings Tab -->
        <div
          v-if="currentTab === 'settings'"
          class="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <form @submit.prevent="saveSettings" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Email Notifications</label
              >
              <div class="mt-2 space-y-2">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="settings.emailNotifications"
                    class="rounded border-gray-300 text-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                  />
                  <span class="ml-2 text-gray-600 dark:text-gray-400">Receive order updates</span>
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Privacy</label
              >
              <div class="mt-2 space-y-2">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="settings.privateProfile"
                    class="rounded border-gray-300 text-black focus:ring-black dark:border-gray-600 dark:bg-gray-700"
                  />
                  <span class="ml-2 text-gray-600 dark:text-gray-400">Make profile private</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              class="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            >
              Save Settings
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Profile</h2>
        <form @submit.prevent="saveProfile" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Name</label
            >
            <input
              v-model="editForm.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Bio</label
            >
            <textarea
              v-model="editForm.bio"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            ></textarea>
          </div>

          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="showEditModal = false"
              class="px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ProfileView',
  setup() {
    const profile = ref({
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Car enthusiast and collector',
      avatar: null,
      coverPhoto: null,
    })

    const currentTab = ref('products')
    const showEditModal = ref(false)
    const profileInput = ref(null)
    const coverInput = ref(null)

    const tabs = [
      { id: 'products', name: 'My Products' },
      { id: 'wishlist', name: 'Wishlist' },
      { id: 'orders', name: 'Orders' },
      { id: 'settings', name: 'Settings' },
    ]

    // Sample data
    const userProducts = ref([])
    const wishlist = ref([])
    const orders = ref([
      {
        id: '1234',
        date: '2024-03-20',
        status: 'Delivered',
        total: '$999.99',
      },
    ])

    const settings = ref({
      emailNotifications: true,
      privateProfile: false,
    })

    const editForm = ref({
      name: profile.value.name,
      bio: profile.value.bio,
    })

    const triggerProfileUpload = () => {
      profileInput.value.click()
    }

    const triggerCoverUpload = () => {
      coverInput.value.click()
    }

    const handleProfileUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          profile.value.avatar = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    const handleCoverUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          profile.value.coverPhoto = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    const saveProfile = () => {
      profile.value.name = editForm.value.name
      profile.value.bio = editForm.value.bio
      showEditModal.value = false
    }

    const saveSettings = () => {
      // Implement settings save logic
      console.log('Settings saved:', settings.value)
    }

    return {
      profile,
      currentTab,
      tabs,
      showEditModal,
      profileInput,
      coverInput,
      userProducts,
      wishlist,
      orders,
      settings,
      editForm,
      triggerProfileUpload,
      triggerCoverUpload,
      handleProfileUpload,
      handleCoverUpload,
      saveProfile,
      saveSettings,
    }
  },
}
</script>

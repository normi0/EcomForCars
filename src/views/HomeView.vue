<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Fixed Navigation Bar -->
    <nav
      class="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-50 transition-all duration-300"
      :class="{ 'shadow-md bg-opacity-95 backdrop-blur-sm': isScrolled }"
    >
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between gap-4">
          <!-- Profile Circle -->
          <div class="relative">
            <button
              @click="showSidebar = !showSidebar"
              class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors overflow-hidden"
            >
              <img
                v-if="profilePhotoUrl"
                :src="profilePhotoUrl"
                :alt="userInitials"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {{ userInitials }}
              </span>
            </button>

            <!-- Sidebar -->
            <div
              v-if="showSidebar"
              class="absolute left-0 top-12 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50"
            >
              <router-link
                to="/profile"
                class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="showSidebar = false"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </router-link>

              <router-link
                to="/wishlist"
                class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="showSidebar = false"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Wishlist
              </router-link>

              <router-link
                to="/orders"
                class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="showSidebar = false"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Orders
              </router-link>

              <router-link
                to="/settings"
                class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="showSidebar = false"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </router-link>

              <div class="border-t border-gray-200 dark:border-gray-700 my-2"></div>

              <button
                @click="logout"
                class="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>

          <!-- Search Bar -->
          <div class="flex-1 max-w-2xl">
            <div class="relative">
              <input
                type="text"
                placeholder="Search products..."
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-green-500 dark:focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Theme Toggle -->
          <ThemeToggle />

          <!-- Filter and Sort Buttons -->
          <div class="fixed top-20 right-4 flex gap-2 z-40">
            <!-- Sort Button -->
            <div class="relative">
              <button
                @click="showSortMenu = !showSortMenu"
                class="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-2"
              >
                <span class="text-gray-700 dark:text-gray-300">Sort by</span>
                <svg
                  class="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- Sort Menu -->
              <div
                v-if="showSortMenu"
                class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2"
              >
                <button
                  v-for="option in sortOptions"
                  :key="option.value"
                  @click="sortProducts(option.value)"
                  class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>

            <!-- Filter Button -->
            <button
              @click="showFilterModal = true"
              class="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-2"
            >
              <span class="text-gray-700 dark:text-gray-300">Filter</span>
              <svg
                class="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Only spacing -->
    <div class="mt-24"></div>

    <!-- Products grid only -->
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        <div
          v-for="product in sortedCars"
          :key="product.id"
          class="bg-white/90 dark:bg-gray-800/50 backdrop-blur rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-300 shadow-lg"
        >
          <div class="relative">
            <img
              :src="product.imageUrl || '/src/assets/images/default-car.jpg'"
              :alt="product.title"
              class="h-64 w-full object-cover"
            />
            <span
              class="absolute top-4 right-4 bg-amber-500 text-black font-bold px-4 py-1 rounded-full"
            >
              {{ product.year }}
            </span>
            <button
              @click="handleToggleFavorite(product)"
              class="absolute top-4 left-4 bg-gray-200 dark:bg-gray-700 rounded-full p-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <svg
                v-if="product.isFavorite"
                class="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <svg
                v-else
                class="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ product.title }}</h3>
              <div class="flex items-center gap-1">
                <span class="text-amber-500">★</span>
                <span class="text-gray-700 dark:text-gray-300">{{ product.rating }}</span>
              </div>
            </div>

            <!-- Key Performance Stats -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <span class="text-amber-600 dark:text-amber-500 text-sm">Power</span>
                <p class="font-bold text-gray-900 dark:text-white">{{ product.features[0] }}</p>
              </div>
              <div class="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <span class="text-amber-600 dark:text-amber-500 text-sm">Acceleration</span>
                <p class="font-bold text-gray-900 dark:text-white">{{ product.features[1] }}</p>
              </div>
            </div>

            <p class="text-gray-600 dark:text-gray-300 mb-6">{{ product.description }}</p>

            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-gray-900 dark:text-white">{{
                product.price.toLocaleString()
              }}</span>
              <button
                @click="openPurchaseModal(product)"
                class="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-2 rounded-full transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Purchase Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-600/80 dark:bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto"
    >
      <div
        class="my-8 bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full p-8 border border-gray-200 dark:border-amber-500 relative shadow-xl"
      >
        <!-- Header -->
        <div class="flex justify-between items-start mb-6">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ selectedProduct.title }}
          </h2>
          <button
            @click="closeModal"
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            <span class="sr-only">Close</span>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Tabs -->
        <div class="mb-6">
          <div class="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-4 py-2 font-semibold transition-colors relative',
                activeTab === tab.id
                  ? 'text-amber-600 dark:text-amber-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-amber-500',
              ]"
            >
              {{ tab.name }}
              <span
                v-if="activeTab === tab.id"
                class="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500"
              ></span>
            </button>
          </div>
        </div>

        <!-- Tab Content -->
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Left Column - Always visible -->
          <div class="space-y-6">
            <img
              :src="selectedProduct.imageUrl || '/src/assets/images/default-car.jpg'"
              :alt="selectedProduct.title"
              class="w-full h-64 object-cover rounded-lg"
            />

            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-2xl font-bold text-gray-900 dark:text-white"
                  >${{ selectedProduct.price.toLocaleString() }}</span
                >
                <span class="text-amber-600 dark:text-amber-500 font-semibold">
                  {{ selectedProduct.year }}
                </span>
              </div>
              <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <span class="text-amber-500">★</span>
                <span>{{ selectedProduct.rating }} Rating</span>
              </div>
            </div>

            <!-- Key Features moved here -->
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <h3 class="text-xl font-bold text-amber-600 dark:text-amber-500 mb-3">
                Key Features
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="(feature, index) in selectedProduct.features"
                  :key="index"
                  class="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  <span class="text-amber-500">•</span>
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Right Column - Tab Content -->
          <div>
            <!-- Vehicle Details Tab -->
            <div v-if="activeTab === 'details'" class="space-y-6">
              <div>
                <h3 class="text-xl font-bold text-amber-600 dark:text-amber-500 mb-4">
                  Specifications
                </h3>
                <div class="grid grid-cols-2 gap-4">
                  <div
                    v-for="(value, key) in selectedProduct.specifications"
                    :key="key"
                    class="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
                  >
                    <span class="text-gray-600 dark:text-gray-400 text-sm capitalize">{{
                      key
                    }}</span>
                    <p class="font-semibold text-gray-900 dark:text-white">{{ value }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Financing Tab -->
            <div v-if="activeTab === 'financing'" class="space-y-6">
              <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 class="text-xl font-bold text-amber-600 dark:text-amber-500 mb-4">
                  Financing Options
                </h3>
                <div class="space-y-4">
                  <div
                    class="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700"
                  >
                    <span class="text-gray-700 dark:text-gray-300">Monthly Payment</span>
                    <span class="font-bold text-gray-900 dark:text-white">
                      ${{ calculateMonthlyPayment(selectedProduct.price, 60).toLocaleString() }}/mo
                    </span>
                  </div>
                  <div
                    class="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700"
                  >
                    <span class="text-gray-700 dark:text-gray-300">Term Length</span>
                    <span class="font-bold text-gray-900 dark:text-white">60 months</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-700 dark:text-gray-300">APR</span>
                    <span class="font-bold text-gray-900 dark:text-white">4.99%</span>
                  </div>
                </div>
              </div>
              q
            </div>

            <!-- Contact Form Tab -->
            <div v-if="activeTab === 'contact'" class="space-y-6">
              <form @submit.prevent="submitPurchase" class="space-y-4">
                <h3 class="text-xl font-bold text-amber-600 dark:text-amber-500">
                  Request Information
                </h3>
                <div class="grid grid-cols-1 gap-4">
                  <input
                    v-model="purchaseForm.name"
                    type="text"
                    placeholder="Full Name"
                    required
                    class="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 w-full text-gray-900 dark:text-white placeholder-gray-500 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <input
                    v-model="purchaseForm.email"
                    type="email"
                    placeholder="Email Address"
                    required
                    class="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 w-full text-gray-900 dark:text-white placeholder-gray-500 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <input
                    v-model="purchaseForm.phone"
                    type="tel"
                    placeholder="Phone Number"
                    required
                    class="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 w-full text-gray-900 dark:text-white placeholder-gray-500 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <textarea
                    v-model="purchaseForm.message"
                    placeholder="Additional Comments or Questions"
                    class="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 w-full h-32 text-gray-900 dark:text-white placeholder-gray-500 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                  </textarea>
                </div>

                <div class="flex justify-end gap-4">
                  <button
                    type="button"
                    @click="closeModal"
                    class="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-2 rounded-full transition-colors"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Modal -->
    <div
      v-if="showFilterModal"
      class="fixed inset-0 bg-gray-600/80 dark:bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto"
    >
      <div
        class="my-8 bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full p-8 border border-gray-200 dark:border-amber-500 relative shadow-xl"
      >
        <!-- Header -->
        <div class="flex justify-between items-start mb-6">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Filters</h2>
          <button
            @click="showFilterModal = false"
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            <span class="sr-only">Close</span>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Filter Content -->
        <div class="space-y-6 w-full max-w-lg mx-auto">
          <!-- Price Range -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Price Range</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <input
                  v-model="filters.minPrice"
                  type="number"
                  class="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder="Min Price"
                />
              </div>
              <div>
                <input
                  v-model="filters.maxPrice"
                  type="number"
                  class="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder="Max Price"
                />
              </div>
            </div>
          </div>

          <!-- Brand Selection -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Brand</h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="brand in availableBrands"
                :key="brand"
                @click="toggleBrand(brand)"
                :class="[
                  'px-4 py-2 rounded-full transition-colors',
                  filters.brands.includes(brand)
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
                ]"
              >
                {{ brand }}
              </button>
            </div>
          </div>

          <!-- Features Input -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Features</h3>
            <div class="space-y-3">
              <input
                v-model="newFeature"
                @keydown.enter="addFeature"
                type="text"
                class="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                placeholder="Type feature and press Enter"
              />
              <!-- Feature Bubbles -->
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="feature in filters.features"
                  :key="feature"
                  class="group bg-amber-500 text-black rounded-full px-3 py-1 flex items-center gap-1"
                >
                  <span>{{ feature }}</span>
                  <button
                    @click="removeFeature(feature)"
                    class="hover:bg-amber-600 rounded-full p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              @click="resetFilters"
              class="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-400 transition-colors"
            >
              Reset
            </button>
            <button
              @click="applyFilters"
              class="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-2 rounded-full transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'
import { collection, getDocs, doc, getDoc, query } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { useToast } from 'vue-toastification'
import { toggleFavorite, deleteCar } from '@/utils/firebaseUtils'
import ThemeToggle from '@/components/ThemeToggle.vue'

export default {
  name: 'HomeView',
  components: {
    ThemeToggle,
  },
  setup() {
    const router = useRouter()
    const toast = useToast()
    const showSidebar = ref(false)
    const showFilterModal = ref(false)
    const showSortMenu = ref(false)
    const isScrolled = ref(false)
    const allCars = ref([])
    const selectedProduct = ref(null)
    const showModal = ref(false)
    const profilePhotoUrl = ref('')
    const userInitials = ref('')
    const loading = ref(false)

    // Filter states
    const filters = reactive({
      minPrice: '',
      maxPrice: '',
      brands: [],
      features: [],
    })

    // Form state
    const purchaseForm = reactive({
      name: '',
      email: '',
      phone: '',
      preferredTime: '',
      message: '',
    })

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

        allCars.value = querySnapshot.docs.map((doc) => ({
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

    const handleToggleFavorite = async (car) => {
      try {
        await toggleFavorite(car.id, car.isFavorite)
        car.isFavorite = !car.isFavorite
        toast.success(car.isFavorite ? 'Added to wishlist' : 'Removed from wishlist')
      } catch (error) {
        toast.error(error.message || 'Failed to update wishlist')
      }
    }

    const handleDeleteCar = async (carId) => {
      try {
        await deleteCar(carId)
        // Remove car from local state
        allCars.value = allCars.value.filter((car) => car.id !== carId)
        toast.success('Car removed successfully')
      } catch (error) {
        toast.error(error.message || 'Failed to delete car')
      }
    }

    // Filter and sort functions
    const filteredCars = computed(() => {
      return allCars.value.filter((car) => {
        if (filters.minPrice && car.price < parseFloat(filters.minPrice)) return false
        if (filters.maxPrice && car.price > parseFloat(filters.maxPrice)) return false
        if (filters.brands.length && !filters.brands.includes(car.brand)) return false
        if (filters.features.length) {
          const carFeatures = car.features || []
          if (!filters.features.every((feature) => carFeatures.includes(feature))) return false
        }
        return true
      })
    })

    const sortedCars = computed(() => {
      const cars = [...filteredCars.value]
      switch (currentSort.value) {
        case 'price-asc':
          return cars.sort((a, b) => a.price - b.price)
        case 'price-desc':
          return cars.sort((a, b) => b.price - a.price)
        case 'brand-asc':
          return cars.sort((a, b) => a.brand.localeCompare(b.brand))
        case 'brand-desc':
          return cars.sort((a, b) => b.brand.localeCompare(a.brand))
        default:
          return cars
      }
    })

    // Modal functions
    const openPurchaseModal = (product) => {
      selectedProduct.value = product
      showModal.value = true
      document.body.classList.add('modal-open')
    }

    const closeModal = () => {
      showModal.value = false
      document.body.classList.remove('modal-open')
      Object.keys(purchaseForm).forEach((key) => (purchaseForm[key] = ''))
    }

    const submitPurchase = () => {
      console.log('Form submitted:', purchaseForm)
      closeModal()
    }

    // Filter functions
    const toggleBrand = (brand) => {
      const index = filters.brands.indexOf(brand)
      if (index === -1) {
        filters.brands.push(brand)
      } else {
        filters.brands.splice(index, 1)
      }
    }

    const resetFilters = () => {
      filters.minPrice = ''
      filters.maxPrice = ''
      filters.brands = []
      filters.features = []
      newFeature.value = ''
    }

    const applyFilters = () => {
      showFilterModal.value = false
    }

    onMounted(async () => {
      await fetchCars()

      window.addEventListener('scroll', () => {
        isScrolled.value = window.scrollY > 0
      })

      const user = getAuth().currentUser
      if (user) {
        profilePhotoUrl.value = user.photoURL || ''
        if (user.displayName) {
          const names = user.displayName.split(' ')
          userInitials.value = names
            .map((n) => n[0])
            .join('')
            .toUpperCase()
        } else {
          userInitials.value = user.email[0].toUpperCase()
        }
      }
    })

    const logout = async () => {
      try {
        await signOut(getAuth())
        router.push('/login')
      } catch (error) {
        console.error('Error signing out:', error)
        toast.error('Failed to sign out')
      }
    }

    const currentSort = ref('price-asc')
    const newFeature = ref('')
    const activeTab = ref('details')

    const sortOptions = [
      { label: 'Price: Low to High', value: 'price-asc' },
      { label: 'Price: High to Low', value: 'price-desc' },
      { label: 'Brand: A to Z', value: 'brand-asc' },
      { label: 'Brand: Z to A', value: 'brand-desc' },
    ]

    const tabs = [
      { id: 'details', name: 'Vehicle Details' },
      { id: 'financing', name: 'Financing' },
      { id: 'contact', name: 'Contact' },
    ]

    const calculateMonthlyPayment = (price, months, apr = 4.99) => {
      const principal = price
      const rate = apr / 1200
      const n = months
      const payment = (principal * (rate * Math.pow(1 + rate, n))) / (Math.pow(1 + rate, n) - 1)
      return Math.round(payment)
    }

    const availableBrands = computed(() => {
      const brands = new Set(allCars.value.map((car) => car.brand))
      return Array.from(brands).sort()
    })

    return {
      // UI states
      showSidebar,
      showSortMenu,
      showFilterModal,
      showModal,
      isScrolled,
      loading,

      // Data
      allCars,
      filteredCars,
      sortedCars,
      selectedProduct,
      profilePhotoUrl,
      userInitials,

      // Form and filters
      filters,
      purchaseForm,
      activeTab,
      currentSort,
      newFeature,

      // Options and computed
      sortOptions,
      availableBrands,
      tabs,

      // Functions
      handleToggleFavorite,
      handleDeleteCar,
      openPurchaseModal,
      closeModal,
      submitPurchase,
      toggleBrand,
      resetFilters,
      applyFilters,
      calculateMonthlyPayment,
      logout,
    }
  },
}
</script>
<style>
.overflow-hidden {
  overflow: hidden !important;
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}
</style>

<style scoped>
/* Prevent body scroll when modal is open */
:deep(body.modal-open) {
  overflow: hidden;
}

/* Add smooth scrolling to the whole page */
html {
  scroll-behavior: smooth;
}
</style>

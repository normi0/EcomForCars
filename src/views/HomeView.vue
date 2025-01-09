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
              class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <span class="text-lg font-semibold text-gray-700 dark:text-gray-200">
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
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
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <!-- Sun icon -->
            <svg
              v-if="isDark"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <!-- Moon icon -->
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          <!-- Filter Button -->
          <button
            @click="showFilterModal = true"
            class="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filter
          </button>

          <!-- Sort Dropdown -->
          <div class="relative">
            <button
              @click="showSortDropdown = !showSortDropdown"
              class="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                />
              </svg>
              Sort
            </button>

            <div
              v-if="showSortDropdown"
              class="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2"
            >
              <button
                v-for="option in sortOptions"
                :key="option.value"
                @click="sort(option.value)"
                class="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {{ option.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Content Wrapper with padding to account for fixed navbar -->
    <div class="pt-20">
      <!-- Filter Modal -->
      <div
        v-if="showFilterModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
          <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Filter Products</h3>

          <!-- Product Name -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Product Name</label
            >
            <input
              v-model="filters.name"
              type="text"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-green-500 dark:focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <!-- Price Range -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Price Range</label
            >
            <div class="flex gap-4">
              <input
                v-model="filters.minPrice"
                type="number"
                placeholder="Min"
                class="w-1/2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-green-500 dark:focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                v-model="filters.maxPrice"
                type="number"
                placeholder="Max"
                class="w-1/2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-green-500 dark:focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <!-- Brand -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Brand</label
            >
            <select
              v-model="filters.brand"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-green-500 dark:focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Brands</option>
              <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
            </select>
          </div>

          <!-- Rating -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Minimum Rating</label
            >
            <select
              v-model="filters.rating"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-green-500 dark:focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Any Rating</option>
              <option v-for="rating in [4, 3, 2, 1]" :key="rating" :value="rating">
                {{ rating }}+ Stars
              </option>
            </select>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end gap-2">
            <button
              @click="showFilterModal = false"
              class="px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              @click="applyFilters"
              class="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Products Section -->
      <div class="container mx-auto px-4 py-8">
        <!-- Product Carousel -->
        <div class="relative">
          <button
            @click="scrollLeft"
            class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div class="overflow-hidden" ref="productsContainer">
            <div
              class="flex gap-6 transition-transform duration-300"
              :style="{ transform: `translateX(-${scrollPosition}px)` }"
            >
              <div v-for="product in products" :key="product.id" class="flex-none w-72">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <img :src="product.image" :alt="product.title" class="w-full h-48 object-cover" />
                  <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                      {{ product.title }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {{ product.description }}
                    </p>

                    <!-- Car Details -->
                    <div class="mt-2 space-y-1">
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        <span class="font-medium">Brand:</span> {{ product.brand }}
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        <span class="font-medium">Year:</span> {{ product.year }}
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        <span class="font-medium">Mileage:</span> {{ product.mileage }} miles
                      </p>
                    </div>

                    <!-- Key Features -->
                    <div class="mt-3">
                      <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Key Features:
                      </p>
                      <ul class="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                        <li v-for="feature in product.features.slice(0, 2)" :key="feature">
                          {{ feature }}
                        </li>
                      </ul>
                    </div>

                    <!-- Rating -->
                    <div class="flex items-center mt-2">
                      <div class="flex">
                        <svg
                          v-for="i in 5"
                          :key="i"
                          :class="[
                            'w-5 h-5',
                            i <= product.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600',
                          ]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                      </div>
                      <span class="ml-2 text-gray-600 dark:text-gray-400"
                        >{{ product.rating }}/5</span
                      >
                    </div>

                    <div class="mt-4 flex justify-between items-center">
                      <span class="text-lg font-bold text-gray-900 dark:text-white"
                        >${{ product.price }}</span
                      >
                      <button
                        @click="openProductDetails(product)"
                        class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                      >
                        See Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            @click="scrollRight"
            class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Product Details Modal -->
      <div
        v-if="selectedProduct"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div
          class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
        >
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ selectedProduct.title }}
            </h2>
            <button
              @click="selectedProduct = null"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
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

          <img
            :src="selectedProduct.image"
            :alt="selectedProduct.title"
            class="w-full h-64 object-cover rounded-lg mb-4"
          />

          <div class="space-y-4">
            <p class="text-gray-600 dark:text-gray-400">{{ selectedProduct.description }}</p>

            <div class="flex items-center">
              <div class="flex">
                <svg
                  v-for="i in 5"
                  :key="i"
                  :class="[
                    'w-5 h-5',
                    i <= selectedProduct.rating
                      ? 'text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600',
                  ]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
              <span class="ml-2 text-gray-600 dark:text-gray-400"
                >{{ selectedProduct.rating }}/5</span
              >
            </div>

            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-gray-900 dark:text-white"
                >${{ selectedProduct.price }}</span
              >
              <button
                @click="openPurchaseModal"
                class="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              >
                Purchase Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Purchase Modal -->
      <div
        v-if="showPurchaseModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
          <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Complete Purchase</h3>

          <!-- Quantity -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Quantity</label
            >
            <input
              v-model="purchaseDetails.quantity"
              type="number"
              min="1"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-green-500 dark:focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <!-- Delivery Address -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Delivery Address</label
            >
            <textarea
              v-model="purchaseDetails.address"
              rows="3"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-green-500 dark:focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            ></textarea>
          </div>

          <!-- Payment Details -->
          <div class="mb-6 space-y-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Payment Details</label
            >
            <input
              v-model="purchaseDetails.cardNumber"
              type="text"
              placeholder="Card Number"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-green-500 dark:focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <div class="flex gap-4">
              <input
                v-model="purchaseDetails.expiryDate"
                type="text"
                placeholder="MM/YY"
                class="w-1/2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-green-500 dark:focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                v-model="purchaseDetails.cvv"
                type="text"
                placeholder="CVV"
                class="w-1/2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-green-500 dark:focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <!-- Total -->
          <div class="mb-6">
            <div class="flex justify-between text-lg font-semibold">
              <span class="text-gray-700 dark:text-gray-300">Total:</span>
              <span class="text-gray-900 dark:text-white">${{ calculateTotal }}</span>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end gap-2">
            <button
              @click="showPurchaseModal = false"
              class="px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              @click="completePurchase"
              class="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Complete Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import productsData from '@/data/products.json'

// Import images
import alfaRomeo from '@/assets/images/alfa.webp'
import mercedesAmg from '@/assets/images/mercedes.avif'
import bmwM5 from '@/assets/images/bmw.avif'

export default {
  name: 'HomeView',
  setup() {
    const showSidebar = ref(false)
    const isScrolled = ref(false)

    // Map the products with the correct image imports
    const products = ref(
      productsData.products.map((product) => ({
        ...product,
        image: product.id === 1 ? alfaRomeo : product.id === 2 ? mercedesAmg : bmwM5,
      })),
    )

    // Add scroll handler
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 0
    }

    // Add event listener when component mounts
    window.addEventListener('scroll', handleScroll)

    // Cleanup when component unmounts
    const cleanup = () => {
      window.removeEventListener('scroll', handleScroll)
    }

    const userInitials = ref('JD') // Placeholder initials, replace with actual user data

    const logout = () => {
      const router = useRouter()
      const authStore = useAuthStore()
      authStore.clearUser()
      router.push('/login')
    }

    return {
      products,
      showSidebar,
      isScrolled,
      userInitials,
      logout,
      cleanup,
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

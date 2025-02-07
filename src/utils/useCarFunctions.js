// composables/useCarFunctions.js
import { computed, ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'
import { toggleFavorite } from '@/utils/firebaseUtils' // Adjust the import path as needed

export const useCarFunctions = (cars, sortBy) => {
  const toast = useToast()
  const selectedProduct = ref(null)
  const showModal = ref(false)
  const purchaseForm = reactive({
    name: '',
    email: '',
    phone: '',
    preferredTime: '',
    message: '',
  })

  // Sorting logic
  const sortedCars = computed(() => {
    const sorted = [...cars.value]
    switch (sortBy.value) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price)
      case 'brand-asc':
        return sorted.sort((a, b) => a.brand.localeCompare(b.brand))
      case 'brand-desc':
        return sorted.sort((a, b) => b.brand.localeCompare(a.brand))
      default:
        return sorted
    }
  })

  // Toggle favorite
  const handleToggleFavorite = async (car) => {
    try {
      await toggleFavorite(car.id, car.isFavorite)
      car.isFavorite = !car.isFavorite
      toast.success(car.isFavorite ? 'Added to wishlist' : 'Removed from wishlist')
    } catch (error) {
      toast.error(error.message || 'Failed to update wishlist')
    }
  }
  const submitPurchase = () => {
    console.log('Form submitted:', purchaseForm)
    closeModal()
  }

  // Open modal
  const openPurchaseModal = (product) => {
    selectedProduct.value = product
    showModal.value = true
    document.body.classList.add('modal-open')
  }

  // Close modal
  const closeModal = () => {
    showModal.value = false
    document.body.classList.remove('modal-open')
  }
  const calculateMonthlyPayment = (price, months, apr = 4.99) => {
    const principal = price
    const rate = apr / 1200
    const n = months
    const payment = (principal * (rate * Math.pow(1 + rate, n))) / (Math.pow(1 + rate, n) - 1)
    return Math.round(payment)
  }

  return {
    sortedCars,
    handleToggleFavorite,
    openPurchaseModal,
    closeModal,
    selectedProduct,
    showModal,
    calculateMonthlyPayment,
    purchaseForm,
    submitPurchase,
  }
}

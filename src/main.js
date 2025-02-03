import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css' // Import the CSS
import App from './App.vue'
import router from './router'

const app = createApp(App)
const toastOptions = {
  timeout: 3000, // Duration of the toast
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
}

app.use(Toast, toastOptions)

app.use(createPinia())
app.use(router)

app.mount('#app')

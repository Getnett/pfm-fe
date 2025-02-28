import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

// Import PrimeVue styles
// import 'primevue/resources/themes/lara-light-indigo/theme.css'
// import 'primevue/resources/primevue.min.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: 'none',
  darkModeTheme: null,
})
app.use(ToastService)
app.component('Toast', Toast)

app.mount('#app')

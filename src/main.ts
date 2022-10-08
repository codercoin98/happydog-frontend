import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import "tailwindcss/tailwind.css"
import './index.css'
import App from './App.vue'
import 'vfonts/Lato.css'
import router from './router'
const app = createApp(App)

app.use(createPinia().use(piniaPluginPersist)).use(router).mount('#app')

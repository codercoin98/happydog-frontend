import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import 'tailwindcss/tailwind.css'
import './index.css'
import App from './App.vue'
import 'vfonts/Lato.css'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import vuepressTheme  from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

// highlightjs
import Prism from 'prismjs';

VMdPreview.use(vuepressTheme , {
  Prism
})
import router from './router'
const app = createApp(App)

app.use(createPinia().use(piniaPluginPersist)).use(router).use(VMdPreview).mount('#app')

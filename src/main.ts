import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useProgressStore } from './stores/progress'
import { useSettingsStore } from './stores/settings'

import './styles/tokens.css'
import './styles/global.css'
import './styles/animations.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

const progress = useProgressStore()
const settings = useSettingsStore()
progress.load()
settings.load()

progress.$subscribe(() => progress.persist())
settings.$subscribe(() => settings.persist())

app.mount('#app')

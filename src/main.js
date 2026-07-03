import { createApp } from 'vue'
import App from './App.vue'

// Шрифты локально (вместо Google Fonts CDN); включают кириллицу
import '@fontsource/oswald/400.css'
import '@fontsource/oswald/500.css'
import '@fontsource/oswald/600.css'
import '@fontsource/oswald/700.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'

import './assets/main.css'

createApp(App).mount('#app')

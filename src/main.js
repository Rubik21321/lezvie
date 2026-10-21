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

// Каждая HTML-страница указывает в data-page, какие секции показать
const el = document.getElementById('app')
createApp(App, { page: el.dataset.page || 'home' }).mount(el)

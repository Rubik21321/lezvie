import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Страницы сайта: у каждой свой HTML (заголовок, description, canonical),
// чтобы счётчики статистики видели отдельные страницы, а не один лендинг
const pages = ['index', 'uslugi', 'mastera', 'raboty', 'zapis', 'kontakty']

// Вставляет общие куски из partials/ во все страницы: <!-- include:counters -->
function htmlIncludes() {
  return {
    name: 'html-includes',
    transformIndexHtml(html) {
      return html.replace(/<!--\s*include:([\w-]+)\s*-->/g, (_, name) =>
        readFileSync(resolve(__dirname, 'partials', `${name}.html`), 'utf8')
      )
    },
  }
}

export default defineConfig({
  plugins: [vue(), htmlIncludes()],
  server: {
    host: '127.0.0.1',
    port: Number(process.env.PORT) || 5173,
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p, resolve(__dirname, `${p}.html`)])),
    },
  },
})

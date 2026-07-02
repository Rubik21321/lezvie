# ЛЕЗВИЕ — лендинг барбершопа (Подольск)

Одностраничный лендинг барбершопа на Vue 3 + Vite. Портфолио-проект.

## Запуск

```bash
npm install
npm run dev      # dev-сервер на http://127.0.0.1:5173
npm run build    # продакшен-сборка в dist/
npm run preview  # локальный просмотр сборки
```

## Структура

- `src/App.vue` — сборка секций + анимация появления при скролле (IntersectionObserver)
- `src/components/TheHeader.vue` — фиксированный хедер, мобильное бургер-меню
- `src/components/HeroSection.vue` — первый экран с CTA и статистикой
- `src/components/ServicesSection.vue` — услуги и цены (данные в массиве `services`)
- `src/components/AdvantagesSection.vue` — преимущества с SVG-иконками
- `src/components/MastersSection.vue` — карточки мастеров
- `src/components/ReviewsSection.vue` — отзывы
- `src/components/BookingSection.vue` — форма записи с валидацией
- `src/components/TheFooter.vue` — контакты и навигация
- `src/assets/main.css` — глобальные стили, палитра в CSS-переменных (`:root`)

## Как адаптировать под клиента

1. Цвета — переменные в `src/assets/main.css` (`--gold`, `--bg` и т.д.)
2. Тексты, цены, мастера — массивы данных в начале каждого компонента
3. Телефон/адрес — `BookingSection.vue` и `TheFooter.vue`
4. Отправка заявки — заглушка в `BookingSection.vue` (`submit()`), подключите бэкенд,
   Telegram-бота или виджет YClients
5. Фото мастеров — замените блок `.master-photo` с инициалами на `<img>`

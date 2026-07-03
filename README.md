# ЛЕЗВИЕ — лендинг барбершопа (Подольск)

Одностраничный лендинг барбершопа на Vue 3 + Vite с онлайн-записью
(Supabase + Telegram-уведомления). Портфолио-проект.

**Сайт:** https://rubik21321.github.io/lezvie/

## Запуск

```bash
npm install
npm run dev      # dev-сервер на http://127.0.0.1:5173
npm run build    # продакшен-сборка в dist/
npm run deploy   # сборка + публикация на GitHub Pages (сайт обновится за 1-2 мин)
```

## Как работает онлайн-запись

```
Форма на сайте → Edge Function «book» (Supabase) → таблица bookings
                                                 → уведомление в Telegram с кнопками
Кнопки ✅/❌ в Telegram → Edge Function «tg-webhook» → смена статуса записи
```

- Клиент выбирает мастера, дату и время; занятые и прошедшие слоты серые и некликабельны
- Один мастер = один клиент на слот (защита и в функции, и уникальным индексом в базе)
- Если заняты все 3 мастера — слот закрыт и для «Любой мастер»
- На сегодня скрываются слоты ближайших ~30 минут (настройка — `isPastToday` в `BookingSection.vue`)

### Управление записями (админ)

- **Telegram**: под каждым уведомлением кнопки «✅ Подтвердить» и «❌ Отменить»;
  отмена сразу освобождает слот на сайте
- **Список всех записей**: дашборд Supabase → Table Editor → `bookings`
  (статусы: `new` / `confirmed` / `cancelled`; строки можно править и удалять вручную)

### Серверная часть (папка `supabase/`)

- `functions/book/index.ts` — GET занятых слотов, POST создания заявки + Telegram
- `functions/tg-webhook/index.ts` — обработчик кнопок из Telegram
- `migrations/*.sql` — таблица `bookings` и уникальный индекс слотов

Деплой функций: `npx supabase functions deploy book tg-webhook --project-ref <ref> --no-verify-jwt --use-api`
(нужен `SUPABASE_ACCESS_TOKEN` в окружении).

Секреты функций (Dashboard → Edge Functions → Secrets): `TG_BOT_TOKEN`, `TG_CHAT_ID`, `TG_WEBHOOK_SECRET`.
Адрес функции для формы — в `.env` (`VITE_BOOKING_ENDPOINT`).

## Структура фронтенда

- `src/App.vue` — сборка секций + анимация появления при скролле (IntersectionObserver)
- `src/components/TheHeader.vue` — фиксированный хедер, мобильное бургер-меню
- `src/components/HeroSection.vue` — первый экран с CTA и статистикой
- `src/components/ServicesSection.vue` — услуги и цены (данные в массиве `services`)
- `src/components/AdvantagesSection.vue` — преимущества с SVG-иконками
- `src/components/MastersSection.vue` — карточки мастеров
- `src/components/ReviewsSection.vue` — отзывы
- `src/components/BookingSection.vue` — форма записи: слоты, валидация, отправка
- `src/components/TheFooter.vue` — контакты и навигация
- `src/assets/main.css` — глобальные стили, палитра в CSS-переменных (`:root`)

## Как адаптировать под клиента

1. Цвета — переменные в `src/assets/main.css` (`--gold`, `--bg` и т.д.)
2. Тексты, цены, мастера — массивы данных в начале каждого компонента
   (мастера продублированы в `BookingSection.vue` и Edge Function `book`)
3. Телефон/адрес — `BookingSection.vue` и `TheFooter.vue`
4. Фото мастеров — замените блок `.master-photo` с инициалами на `<img>`
5. Для нового клиента: свой проект Supabase, свой бот через @BotFather,
   его chat_id в `TG_CHAT_ID` — схема переиспользуется целиком

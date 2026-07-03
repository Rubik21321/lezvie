<script setup>
import { reactive, ref, computed, watch } from 'vue'

const ENDPOINT = import.meta.env.VITE_BOOKING_ENDPOINT || ''

const form = reactive({
  name: '',
  phone: '',
  service: '',
  master: 'Любой мастер',
  date: '',
  time: '',
})

const sent = ref(false)
const sending = ref(false)
const error = ref('')
const consent = ref(false)

const services = [
  'Мужская стрижка',
  'Стрижка машинкой',
  'Оформление бороды',
  'Стрижка + борода',
  'Королевское бритьё',
  'Детская стрижка',
  'Камуфляж седины',
  'Отец + сын',
]

const masters = ['Любой мастер', 'Артём', 'Денис', 'Марк']

const times = []
for (let h = 10; h <= 20; h++) {
  times.push(`${h}:00`)
  if (h < 20) times.push(`${h}:30`)
}

// Маска телефона +7 (___) ___-__-__
function phoneDigits(value) {
  let d = value.replace(/\D/g, '')
  if (d.startsWith('8')) d = '7' + d.slice(1)
  if (d && !d.startsWith('7')) d = '7' + d
  return d.slice(0, 11)
}

function formatPhone(d) {
  if (!d) return ''
  const p = d.slice(1)
  let out = '+7'
  if (p.length > 0) out += ' (' + p.slice(0, 3)
  if (p.length > 3) out += ') ' + p.slice(3, 6)
  if (p.length > 6) out += '-' + p.slice(6, 8)
  if (p.length > 8) out += '-' + p.slice(8, 10)
  return out
}

function onPhoneInput(e) {
  form.phone = formatPhone(phoneDigits(e.target.value))
  e.target.value = form.phone
}

const today = new Date().toISOString().slice(0, 10)

const maxDate = computed(() => {
  const d = new Date()
  d.setMonth(d.getMonth() + 2)
  return d.toISOString().slice(0, 10)
})

// Занятые слоты для выбранного мастера и даты
const busy = ref([])
const busyLoading = ref(false)

async function loadBusy() {
  if (!ENDPOINT || !form.date) {
    busy.value = []
    return
  }
  busyLoading.value = true
  try {
    const res = await fetch(
      `${ENDPOINT}?master=${encodeURIComponent(form.master)}&date=${form.date}`
    )
    const data = await res.json()
    busy.value = data.ok ? data.busy : []
  } catch {
    busy.value = []
  } finally {
    busyLoading.value = false
  }
  if (busy.value.includes(form.time)) form.time = ''
}

watch(() => [form.master, form.date], loadBusy)

function isPastToday(t) {
  if (form.date !== today) return false
  const [h, m] = t.split(':').map(Number)
  const now = new Date()
  return h * 60 + m <= now.getHours() * 60 + now.getMinutes() + 29 // ближайшие полчаса не бронируем
}

function slotDisabled(t) {
  return busy.value.includes(t) || isPastToday(t)
}

async function submit() {
  error.value = ''
  if (!form.name.trim() || !form.phone.trim() || !form.service) {
    error.value = 'Заполните имя, телефон и выберите услугу'
    return
  }
  if (form.phone.replace(/\D/g, '').length !== 11) {
    error.value = 'Введите номер телефона полностью'
    return
  }
  if (!form.date || !form.time) {
    error.value = 'Выберите дату и время'
    return
  }

  // Без настроенного бэкенда — демо-режим
  if (!ENDPOINT) {
    sent.value = true
    return
  }

  sending.value = true
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form }),
    })
    const data = await res.json().catch(() => ({}))
    if (res.status === 409) {
      error.value = data.error || 'Это время уже занято — выберите другое'
      form.time = ''
      loadBusy()
      return
    }
    if (!res.ok || !data.ok) {
      throw new Error(data.error || `Ошибка ${res.status}`)
    }
    sent.value = true
    // Цель для Яндекс.Метрики (если счётчик подключён)
    if (typeof window.ym === 'function' && window.YM_ID) {
      window.ym(window.YM_ID, 'reachGoal', 'booking_submit')
    }
  } catch (e) {
    error.value =
      'Не получилось отправить заявку. Позвоните нам: +7 (4967) 00-00-00'
    console.error('booking error:', e)
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section id="booking" class="section booking">
    <div class="container booking-inner">
      <div class="booking-info reveal">
        <span class="section-tag">Запись</span>
        <h2 class="section-title">Запишись на стрижку</h2>
        <p class="booking-text">
          Выберите услугу, мастера и удобное время — администратор подтвердит запись
          по телефону в течение 15 минут. Или позвоните сами:
        </p>
        <a class="booking-phone" href="tel:+74967000000">+7 (4967) 00-00-00</a>
        <p class="booking-hours">Ежедневно с 10:00 до 21:00</p>

        <!-- Ссылку замените на реальный аккаунт барбершопа -->
        <a
          class="tg-btn"
          href="https://t.me/lezvie_barber"
          target="_blank"
          rel="noopener"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M21.9 4.6c.3-1.2-.9-2.2-2-1.7L2.9 9.6c-1.2.5-1.1 2.2.1 2.6l4.4 1.4 1.7 5.4c.3 1 1.6 1.3 2.3.5l2.4-2.5 4.5 3.3c.9.7 2.2.2 2.4-.9l3.2-14.8ZM8.5 12.9l9.3-5.7c.2-.1.4.2.2.3l-7.7 7.1c-.3.3-.5.7-.6 1.1l-.3 2.2c0 .3-.5.3-.5 0l-.7-4.1c-.1-.4.1-.7.3-.9Z" />
          </svg>
          Или напишите нам в Telegram
        </a>
      </div>

      <form v-if="!sent" class="booking-form reveal" @submit.prevent="submit">
        <div class="field-row">
          <label class="field">
            <span class="field-label">Ваше имя</span>
            <input v-model="form.name" type="text" placeholder="Иван" autocomplete="name" />
          </label>

          <label class="field">
            <span class="field-label">Телефон</span>
            <input
              :value="form.phone"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              autocomplete="tel"
              inputmode="tel"
              @input="onPhoneInput"
            />
          </label>
        </div>

        <label class="field">
          <span class="field-label">Услуга</span>
          <select v-model="form.service">
            <option value="" disabled>Выберите услугу</option>
            <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
          </select>
        </label>

        <label class="field">
          <span class="field-label">Мастер</span>
          <select v-model="form.master">
            <option v-for="m in masters" :key="m" :value="m">{{ m }}</option>
          </select>
        </label>

        <label class="field">
          <span class="field-label">Дата</span>
          <input v-model="form.date" type="date" :min="today" :max="maxDate" />
        </label>

        <div class="field">
          <span class="field-label">Время{{ busyLoading ? ' · проверяем…' : '' }}</span>
          <p v-if="!form.date" class="slots-hint">Сначала выберите дату</p>
          <div v-else class="slots-grid">
            <button
              v-for="t in times"
              :key="t"
              type="button"
              class="slot"
              :class="{ selected: form.time === t, unavailable: slotDisabled(t) }"
              :disabled="slotDisabled(t)"
              :title="busy.includes(t) ? 'Занято' : isPastToday(t) ? 'Время прошло' : ''"
              @click="form.time = form.time === t ? '' : t"
            >
              {{ t }}
            </button>
          </div>
        </div>

        <p v-if="error" class="form-error">{{ error }}</p>

        <label class="consent">
          <input v-model="consent" type="checkbox" />
          <span>
            Соглашаюсь на
            <a href="#privacy">обработку персональных данных</a>
          </span>
        </label>

        <button type="submit" class="btn btn-solid form-submit" :disabled="sending || !consent">
          {{ sending ? 'Отправляем…' : 'Отправить заявку' }}
        </button>
      </form>

      <div v-else class="booking-success reveal is-visible">
        <span class="success-icon">✓</span>
        <h3>Заявка отправлена!</h3>
        <p>
          Спасибо, {{ form.name }}! Ждём вас {{ form.date.split('-').reverse().join('.') }}
          в {{ form.time }}. Администратор перезвонит на {{ form.phone }} и подтвердит запись.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.booking {
  background:
    radial-gradient(ellipse 70% 80% at 85% 50%, rgba(201, 162, 94, 0.08) 0%, transparent 60%),
    var(--bg-soft);
}

.booking-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.booking-text {
  color: var(--muted);
  margin-bottom: 28px;
  max-width: 420px;
}

.booking-phone {
  display: inline-block;
  font-family: var(--font-head);
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 600;
  color: var(--gold);
  margin-bottom: 8px;
  transition: color 0.2s;
}

.booking-phone:hover {
  color: var(--gold-bright);
}

.booking-hours {
  color: var(--muted);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.tg-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 28px;
  padding: 14px 24px;
  border: 1px solid var(--gold);
  color: var(--gold);
  font-family: var(--font-head);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: background 0.25s, color 0.25s;
}

.tg-btn:hover {
  background: var(--gold);
  color: #121212;
}

.booking-form {
  background: var(--bg-card);
  border: 1px solid var(--line);
  padding: 40px 36px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.field-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--muted);
}

.field input,
.field select {
  background: var(--bg);
  border: 1px solid var(--line);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 15px;
  padding: 14px 16px;
  outline: none;
  transition: border-color 0.2s;
  appearance: none;
  width: 100%;
}

.field input:focus,
.field select:focus {
  border-color: var(--gold);
}

.field input[type='date'] {
  color-scheme: dark;
}

.field select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23c9a25e' fill='none' stroke-width='1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
}

.slots-hint {
  color: var(--muted);
  font-size: 14px;
  padding: 6px 0;
}

.slots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(62px, 1fr));
  gap: 8px;
}

.slot {
  padding: 10px 0;
  background: var(--bg);
  border: 1px solid var(--line);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 14px;
  text-align: center;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}

.slot:hover:not(:disabled):not(.selected) {
  border-color: var(--gold);
}

.slot.selected {
  background: var(--gold);
  border-color: var(--gold);
  color: #121212;
  font-weight: 600;
}

.slot.unavailable {
  color: #55534e;
  background: transparent;
  border-color: #232327;
  text-decoration: line-through;
  cursor: not-allowed;
}

.form-error {
  color: #e07a5f;
  font-size: 14px;
}

.consent {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  font-size: 13px;
  color: var(--muted);
}

.consent input {
  width: 18px;
  height: 18px;
  margin-top: 1px;
  accent-color: var(--gold);
  cursor: pointer;
  flex-shrink: 0;
}

.consent a {
  color: var(--gold);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.consent a:hover {
  color: var(--gold-bright);
}

.form-submit {
  width: 100%;
  margin-top: 4px;
}

.form-submit:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
}

.booking-success {
  background: var(--bg-card);
  border: 1px solid var(--gold);
  padding: 56px 40px;
  text-align: center;
}

.success-icon {
  display: inline-flex;
  width: 64px;
  height: 64px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--gold);
  border-radius: 50%;
  color: var(--gold);
  font-size: 28px;
  margin-bottom: 20px;
}

.booking-success h3 {
  font-size: 26px;
  margin-bottom: 12px;
}

.booking-success p {
  color: var(--muted);
}

@media (max-width: 900px) {
  .booking-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 460px) {
  .field-row {
    grid-template-columns: 1fr;
  }
}
</style>

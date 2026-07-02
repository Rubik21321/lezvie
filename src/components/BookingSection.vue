<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  phone: '',
  service: '',
  master: 'Любой мастер',
})

const sent = ref(false)
const error = ref('')

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

function submit() {
  error.value = ''
  if (!form.name.trim() || !form.phone.trim() || !form.service) {
    error.value = 'Заполните имя, телефон и выберите услугу'
    return
  }
  // Здесь в реальном проекте — отправка на бэкенд / в Telegram / YClients
  sent.value = true
}
</script>

<template>
  <section id="booking" class="section booking">
    <div class="container booking-inner">
      <div class="booking-info reveal">
        <span class="section-tag">Запись</span>
        <h2 class="section-title">Запишись на стрижку</h2>
        <p class="booking-text">
          Оставьте заявку — администратор перезвонит в течение 15 минут и подберёт удобное время.
          Или позвоните сами:
        </p>
        <a class="booking-phone" href="tel:+74967000000">+7 (4967) 00-00-00</a>
        <p class="booking-hours">Ежедневно с 10:00 до 21:00</p>
      </div>

      <form v-if="!sent" class="booking-form reveal" @submit.prevent="submit">
        <label class="field">
          <span class="field-label">Ваше имя</span>
          <input v-model="form.name" type="text" placeholder="Иван" autocomplete="name" />
        </label>

        <label class="field">
          <span class="field-label">Телефон</span>
          <input v-model="form.phone" type="tel" placeholder="+7 (___) ___-__-__" autocomplete="tel" />
        </label>

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

        <p v-if="error" class="form-error">{{ error }}</p>

        <button type="submit" class="btn btn-solid form-submit">Отправить заявку</button>
        <p class="form-note">
          Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
        </p>
      </form>

      <div v-else class="booking-success reveal is-visible">
        <span class="success-icon">✓</span>
        <h3>Заявка отправлена!</h3>
        <p>
          Спасибо, {{ form.name }}! Мы перезвоним на {{ form.phone }} в течение 15 минут
          и подтвердим запись.
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

.booking-form {
  background: var(--bg-card);
  border: 1px solid var(--line);
  padding: 40px 36px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
}

.field input:focus,
.field select:focus {
  border-color: var(--gold);
}

.field select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23c9a25e' fill='none' stroke-width='1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
}

.form-error {
  color: #e07a5f;
  font-size: 14px;
}

.form-submit {
  width: 100%;
  margin-top: 4px;
}

.form-note {
  font-size: 12px;
  color: var(--muted);
  text-align: center;
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
</style>

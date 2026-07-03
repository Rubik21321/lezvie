<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

// Модалка открывается по хэшу #privacy — ссылки на неё работают из любого места
const open = ref(false)

function syncWithHash() {
  open.value = window.location.hash === '#privacy'
}

function close() {
  open.value = false
  if (window.location.hash === '#privacy') {
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }
}

function onKey(e) {
  if (e.key === 'Escape') close()
}

watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})

onMounted(() => {
  syncWithHash()
  window.addEventListener('hashchange', syncWithHash)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', syncWithHash)
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="pp">
      <div
        v-if="open"
        class="pp-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Политика конфиденциальности"
        @click.self="close"
      >
        <div class="pp-modal">
          <button type="button" class="pp-close" aria-label="Закрыть" @click="close">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>

          <h2 class="pp-title">Политика конфиденциальности</h2>
          <p class="pp-updated">Редакция от 3 июля 2026 года</p>

          <div class="pp-body">
            <h3>1. Общие положения</h3>
            <p>
              Настоящая политика обработки персональных данных составлена в соответствии с
              требованиями Федерального закона от 27.07.2006 №152-ФЗ «О персональных данных»
              и определяет порядок обработки персональных данных посетителей сайта барбершопа
              «Лезвие» (далее — Оператор).
            </p>
            <p>
              Оператор: ИП Иванов А. А., ИНН 000000000000.<br />
              Адрес: г. Подольск, Революционный проспект, 25.<br />
              E-mail: hello@lezvie-barber.ru.
            </p>

            <h3>2. Какие данные мы собираем</h3>
            <p>
              При оформлении онлайн-записи на сайте Оператор обрабатывает следующие данные:
              имя и номер телефона, а также выбранные вами услугу, мастера, дату и время визита.
              Иные персональные данные сайт не собирает.
            </p>

            <h3>3. Цели обработки</h3>
            <p>
              Данные обрабатываются исключительно для записи на услуги барбершопа:
              подтверждения записи по телефону, напоминания о визите и его переноса или отмены.
              Данные не используются для рекламных рассылок и не передаются третьим лицам.
            </p>

            <h3>4. Правовое основание</h3>
            <p>
              Обработка осуществляется на основании согласия субъекта персональных данных,
              которое вы даёте, отмечая соответствующий пункт в форме записи перед отправкой заявки
              (ст. 6 №152-ФЗ).
            </p>

            <h3>5. Хранение и защита</h3>
            <p>
              Данные хранятся в защищённой базе данных с ограниченным доступом. Срок хранения —
              до достижения целей обработки, но не более одного года с момента визита, либо до
              отзыва согласия. По истечении срока данные удаляются.
            </p>

            <h3>6. Ваши права</h3>
            <p>
              Вы вправе запросить сведения об обработке ваших данных, потребовать их уточнения
              или удаления, а также отозвать согласие на обработку. Для этого направьте запрос
              на e-mail hello@lezvie-barber.ru или сообщите администратору по телефону
              +7 (4967) 00-00-00. Запрос рассматривается в течение 10 рабочих дней.
            </p>

            <h3>7. Изменения политики</h3>
            <p>
              Оператор вправе обновлять настоящую политику. Актуальная редакция всегда доступна
              на этой странице.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.pp-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(10, 10, 12, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.pp-modal {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--line);
  max-width: 720px;
  width: 100%;
  max-height: 86vh;
  overflow-y: auto;
  padding: 44px 44px 36px;
}

.pp-close {
  position: sticky;
  top: 0;
  float: right;
  margin: -24px -24px 0 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--line);
  color: var(--text);
  transition: border-color 0.2s, color 0.2s;
}

.pp-close:hover {
  border-color: var(--gold);
  color: var(--gold);
}

.pp-title {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 6px;
  padding-right: 40px;
}

.pp-updated {
  color: var(--muted);
  font-size: 13px;
  margin-bottom: 24px;
}

.pp-body h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--gold);
  margin: 22px 0 8px;
}

.pp-body p {
  font-size: 14px;
  color: var(--text);
  line-height: 1.7;
  margin-bottom: 8px;
}

.pp-enter-active,
.pp-leave-active {
  transition: opacity 0.25s ease;
}

.pp-enter-from,
.pp-leave-to {
  opacity: 0;
}

@media (max-width: 560px) {
  .pp-overlay {
    padding: 10px;
  }

  .pp-modal {
    padding: 28px 20px 24px;
  }
}
</style>

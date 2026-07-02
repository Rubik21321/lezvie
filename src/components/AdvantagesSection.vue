<script setup>
const advantages = [
  {
    icon: 'scissors',
    title: 'Мастера с опытом от 5 лет',
    text: 'Никаких стажёров на клиентах. Каждый барбер прошёл обучение и работает с постоянной базой.',
  },
  {
    icon: 'clock',
    title: 'Точно по записи',
    text: 'Начинаем вовремя. Если опоздали мы — стрижка за наш счёт.',
  },
  {
    icon: 'cup',
    title: 'Атмосфера',
    text: 'Кофе, лимонад или кое-что покрепче — за счёт заведения. PlayStation в зоне ожидания.',
  },
  {
    icon: 'drop',
    title: 'Профессиональная косметика',
    text: 'Работаем на American Crew, Reuzel и Uppercut. Всё можно купить у нас.',
  },
  {
    icon: 'pin',
    title: 'Центр Подольска',
    text: 'Ревпроспект, 2 минуты пешком от станции. Своя парковка во дворе.',
  },
  {
    icon: 'shield',
    title: 'Стерильность',
    text: 'Инструмент дезинфицируется после каждого клиента. Одноразовые воротнички и лезвия.',
  },
]

const icons = {
  scissors:
    'M9.64 7.64A3 3 0 1 0 6 9a3 3 0 0 0 1.55-.44L10 11l-2.45 2.44A3 3 0 0 0 6 13a3 3 0 1 0 3 3 3 3 0 0 0-.36-1.42L11 12.17l7.6 7.6L21 21l-9-9 9-9-2.4 1.23L11 11.83Z',
  clock:
    'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm1-13h-2v6l5.25 3.15 1-1.65-4.25-2.5Z',
  cup: 'M18 5V3H4v10a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-2h1a3 3 0 0 0 3-3V5Zm2 3a1 1 0 0 1-1 1h-1V7h2ZM4 19h16v2H4Z',
  drop: 'M12 2S5.5 9.24 5.5 13.5a6.5 6.5 0 0 0 13 0C18.5 9.24 12 2 12 2Zm0 16a4.5 4.5 0 0 1-4.5-4.5c0-2.38 2.87-6.5 4.5-8.7 1.63 2.2 4.5 6.32 4.5 8.7A4.5 4.5 0 0 1 12 18Z',
  pin: 'M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5Z',
  shield:
    'M12 2 4 5.5V11c0 5.05 3.41 9.76 8 11 4.59-1.24 8-5.95 8-11V5.5Zm0 17.9c-3.45-1.13-6-4.82-6-8.9V6.8l6-2.63 6 2.63V11c0 4.08-2.55 7.77-6 8.9Zm-1.5-7.31L8.4 10.5 7 11.9l3.5 3.5 6-6-1.4-1.4Z',
}
</script>

<template>
  <section id="advantages" class="section">
    <div class="container">
      <div class="reveal">
        <span class="section-tag">Почему мы</span>
        <h2 class="section-title">Не просто парикмахерская</h2>
        <p class="section-sub">
          «Лезвие» — место, куда возвращаются. 8 из 10 клиентов приходят к нам повторно.
        </p>
      </div>

      <div class="adv-grid">
        <article v-for="item in advantages" :key="item.title" class="adv-card reveal">
          <span class="adv-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
              <path :d="icons[item.icon]" />
            </svg>
          </span>
          <h3 class="adv-title">{{ item.title }}</h3>
          <p class="adv-text">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.adv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 40px 32px;
}

.adv-card {
  display: grid;
  grid-template-columns: 56px 1fr;
  grid-template-rows: auto auto;
  column-gap: 20px;
}

.adv-icon {
  grid-row: 1 / 3;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--gold);
  color: var(--gold);
}

.adv-title {
  font-size: 19px;
  font-weight: 600;
  margin-bottom: 8px;
  align-self: end;
}

.adv-text {
  font-size: 14px;
  color: var(--muted);
}
</style>

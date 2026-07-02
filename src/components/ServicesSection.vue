<script setup>
const services = [
  {
    name: 'Мужская стрижка',
    desc: 'Консультация, мытьё головы, стрижка, укладка',
    price: '1 400 ₽',
    time: '60 мин',
  },
  {
    name: 'Стрижка машинкой',
    desc: 'Одна насадка по всей голове, окантовка',
    price: '900 ₽',
    time: '30 мин',
  },
  {
    name: 'Оформление бороды',
    desc: 'Моделирование формы, бритьё контуров, уход',
    price: '900 ₽',
    time: '40 мин',
  },
  {
    name: 'Стрижка + борода',
    desc: 'Комплекс: стрижка и борода со скидкой',
    price: '2 000 ₽',
    time: '90 мин',
    hit: true,
  },
  {
    name: 'Королевское бритьё',
    desc: 'Опасная бритва, горячее полотенце, уход за кожей',
    price: '1 500 ₽',
    time: '45 мин',
  },
  {
    name: 'Детская стрижка',
    desc: 'Для парней до 12 лет, терпеливо и с настроением',
    price: '1 000 ₽',
    time: '45 мин',
  },
  {
    name: 'Камуфляж седины',
    desc: 'Тонирование волос или бороды, естественный результат',
    price: '1 200 ₽',
    time: '30 мин',
  },
  {
    name: 'Отец + сын',
    desc: 'Две стрижки подряд, общее время и выгода',
    price: '2 200 ₽',
    time: '100 мин',
  },
]
</script>

<template>
  <section id="services" class="section services">
    <div class="container">
      <div class="reveal">
        <span class="section-tag">Прайс</span>
        <h2 class="section-title">Услуги и цены</h2>
        <p class="section-sub">
          Честные цены без «от». Оплата картой или наличными, чек — всегда.
        </p>
      </div>

      <div class="services-grid">
        <article
          v-for="service in services"
          :key="service.name"
          class="service-card reveal"
          :class="{ hit: service.hit }"
        >
          <span v-if="service.hit" class="hit-badge">Хит</span>
          <h3 class="service-name">{{ service.name }}</h3>
          <p class="service-desc">{{ service.desc }}</p>
          <div class="service-meta">
            <span class="service-price">{{ service.price }}</span>
            <span class="service-time">{{ service.time }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  background: var(--bg-soft);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
  gap: 20px;
}

.service-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--line);
  padding: 28px 26px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.service-card:hover {
  border-color: var(--gold);
  transform: translateY(-4px);
}

.service-card.hit {
  border-color: var(--gold);
}

.hit-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--gold);
  color: #121212;
  font-family: var(--font-head);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 5px 14px;
}

.service-name {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}

.service-desc {
  font-size: 14px;
  color: var(--muted);
  flex: 1;
  margin-bottom: 22px;
}

.service-meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-top: 1px solid var(--line);
  padding-top: 16px;
}

.service-price {
  font-family: var(--font-head);
  font-size: 24px;
  font-weight: 600;
  color: var(--gold);
}

.service-time {
  font-size: 13px;
  color: var(--muted);
}
</style>

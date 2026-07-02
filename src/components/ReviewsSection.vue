<script setup>
const reviews = [
  {
    name: 'Сергей К.',
    date: 'Июнь 2026',
    text: 'Хожу к Артёму уже третий год. Ни разу не пришлось объяснять, что я хочу — он помнит и делает лучше, чем я представлял.',
  },
  {
    name: 'Иван П.',
    date: 'Май 2026',
    text: 'Первый раз попробовал королевское бритьё у Дениса. Горячее полотенце, опасная бритва — ощущение, что побывал в другой эпохе. Теперь только так.',
  },
  {
    name: 'Максим Р.',
    date: 'Май 2026',
    text: 'Привёл сына на «отец + сын» — ребёнок в восторге, я тоже. Пока стриглись, малой успел погонять в PlayStation. Рекомендую.',
  },
  {
    name: 'Андрей В.',
    date: 'Апрель 2026',
    text: 'Записался онлайн за минуту, пришёл — приняли ровно вовремя. Кофе, музыка, отличный fade. Лучший барбершоп в Подольске, без вариантов.',
  },
]
</script>

<template>
  <section id="reviews" class="section">
    <div class="container">
      <div class="reveal">
        <span class="section-tag">Отзывы</span>
        <h2 class="section-title">Что говорят клиенты</h2>
        <p class="section-sub">
          Средняя оценка 4.9 из 5 по 400+ отзывам на Яндекс Картах и 2ГИС.
        </p>
      </div>

      <div class="reviews-grid">
        <blockquote v-for="review in reviews" :key="review.name" class="review-card reveal">
          <div class="review-stars" aria-label="Оценка 5 из 5">★★★★★</div>
          <p class="review-text">{{ review.text }}</p>
          <footer class="review-footer">
            <cite class="review-name">{{ review.name }}</cite>
            <span class="review-date">{{ review.date }}</span>
          </footer>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.review-card {
  background: var(--bg-card);
  border: 1px solid var(--line);
  padding: 28px 26px;
  display: flex;
  flex-direction: column;
}

.review-stars {
  color: var(--gold);
  letter-spacing: 4px;
  margin-bottom: 16px;
}

.review-text {
  font-size: 15px;
  color: var(--text);
  flex: 1;
  margin-bottom: 22px;
}

.review-footer {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-top: 1px solid var(--line);
  padding-top: 14px;
}

.review-name {
  font-style: normal;
  font-family: var(--font-head);
  font-weight: 500;
  letter-spacing: 0.06em;
}

.review-date {
  font-size: 13px;
  color: var(--muted);
}
</style>

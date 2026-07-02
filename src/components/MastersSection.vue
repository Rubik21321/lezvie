<script setup>
const masters = [
  {
    name: 'Артём',
    role: 'Топ-барбер, основатель',
    exp: 'Опыт 9 лет',
    about: 'Классика и fade любой сложности. Судья чемпионатов по барберингу.',
    initials: 'А',
  },
  {
    name: 'Денис',
    role: 'Барбер',
    exp: 'Опыт 6 лет',
    about: 'Мастер по бородам. Королевское бритьё — его коронный номер.',
    initials: 'Д',
  },
  {
    name: 'Марк',
    role: 'Барбер',
    exp: 'Опыт 5 лет',
    about: 'Текстурные стрижки и кроп. Найдёт форму под любой типаж.',
    initials: 'М',
  },
]
</script>

<template>
  <section id="masters" class="section masters">
    <div class="container">
      <div class="reveal">
        <span class="section-tag">Команда</span>
        <h2 class="section-title">Наши мастера</h2>
        <p class="section-sub">
          Выбирайте барбера при записи — или доверьтесь администратору, подберём под задачу.
        </p>
      </div>

      <div class="masters-grid">
        <article v-for="master in masters" :key="master.name" class="master-card reveal">
          <div class="master-photo">
            <span class="master-initials">{{ master.initials }}</span>
          </div>
          <div class="master-info">
            <h3 class="master-name">{{ master.name }}</h3>
            <p class="master-role">{{ master.role }} · {{ master.exp }}</p>
            <p class="master-about">{{ master.about }}</p>
            <a href="#booking" class="master-link">Записаться к мастеру →</a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.masters {
  background: var(--bg-soft);
}

.masters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.master-card {
  background: var(--bg-card);
  border: 1px solid var(--line);
  overflow: hidden;
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.master-card:hover {
  border-color: var(--gold);
  transform: translateY(-4px);
}

.master-photo {
  aspect-ratio: 4 / 3;
  background:
    radial-gradient(circle at 50% 35%, rgba(201, 162, 94, 0.22) 0%, transparent 55%),
    linear-gradient(160deg, #232227 0%, #141416 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.master-initials {
  font-family: var(--font-head);
  font-size: 72px;
  font-weight: 700;
  color: var(--gold);
  opacity: 0.85;
}

.master-info {
  padding: 24px 26px 28px;
}

.master-name {
  font-size: 24px;
  font-weight: 600;
}

.master-role {
  font-size: 13px;
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 6px 0 14px;
}

.master-about {
  font-size: 14px;
  color: var(--muted);
  margin-bottom: 18px;
}

.master-link {
  font-family: var(--font-head);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
  transition: color 0.2s;
}

.master-link:hover {
  color: var(--gold-bright);
}
</style>

<template>
  <section class="hero">
    <div class="hero-bg" aria-hidden="true">
      <div class="hero-stripes"></div>
      <div class="hero-glow"></div>
    </div>

    <div class="container hero-inner">
      <p class="hero-tag">Барбершоп · Подольск</p>
      <h1 class="hero-title">
        Острые стрижки.<br />
        <span class="accent">Точные линии.</span>
      </h1>
      <p class="hero-text">
        Мужские стрижки, оформление бороды и королевское бритьё опасной бритвой.
        Виски, кофе и разговоры по делу — в двух минутах от станции Подольск.
      </p>
      <div class="hero-actions">
        <a href="#booking" class="btn btn-solid">Записаться онлайн</a>
        <a href="#services" class="btn btn-ghost">Услуги и цены</a>
      </div>

      <ul class="hero-stats">
        <li><strong>7</strong><span>лет в деле</span></li>
        <li><strong>12 000+</strong><span>стрижек</span></li>
        <li><strong>4.9</strong><span>рейтинг на Яндексе</span></li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 140px 0 80px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 70% 20%, #1c1a16 0%, var(--bg) 65%);
}

.hero-stripes {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    -55deg,
    transparent 0px,
    transparent 90px,
    rgba(201, 162, 94, 0.045) 90px,
    rgba(201, 162, 94, 0.045) 92px
  );
}

.hero-glow {
  position: absolute;
  top: -20%;
  right: -10%;
  width: 55vw;
  height: 55vw;
  background: radial-gradient(circle, rgba(201, 162, 94, 0.09) 0%, transparent 60%);
}

.hero-inner {
  position: relative;
  max-width: 720px;
  margin-left: calc((100% - min(1140px, 100% - 40px)) / 2 + 20px);
}

.hero-tag {
  font-family: var(--font-head);
  color: var(--gold);
  letter-spacing: 0.4em;
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 22px;
}

.hero-title {
  font-size: clamp(44px, 8vw, 88px);
  font-weight: 700;
  margin-bottom: 26px;
}

.accent {
  color: var(--gold);
}

.hero-text {
  font-size: 18px;
  color: var(--muted);
  max-width: 520px;
  margin-bottom: 40px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 64px;
}

.hero-stats {
  display: flex;
  gap: 56px;
  list-style: none;
}

.hero-stats li {
  display: flex;
  flex-direction: column;
}

.hero-stats strong {
  font-family: var(--font-head);
  font-size: 34px;
  font-weight: 600;
  color: var(--gold);
}

.hero-stats span {
  font-size: 13px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

@media (max-width: 1180px) {
  .hero-inner {
    margin-left: auto;
    margin-right: auto;
    width: min(1140px, 100% - 40px);
  }
}

@media (max-width: 640px) {
  .hero-stats {
    gap: 32px;
    flex-wrap: wrap;
  }
}
</style>

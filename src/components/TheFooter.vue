<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-col">
        <a href="#" class="footer-logo"><span>✂</span> ЛЕЗВИЕ</a>
        <p class="footer-desc">
          Мужской барбершоп в Подольске. Стрижки, бороды, королевское бритьё.
        </p>
      </div>

      <div class="footer-col">
        <h4 class="footer-title">Контакты</h4>
        <ul class="footer-list">
          <li>
            <a href="tel:+74967000000">+7 (4967) 00-00-00</a>
          </li>
          <li>
            <a href="mailto:hello@lezvie-barber.ru">hello@lezvie-barber.ru</a>
          </li>
          <li>г. Подольск, Революционный пр-т, 25</li>
          <li>Ежедневно 10:00–21:00</li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-title">Мы в соцсетях</h4>
        <ul class="footer-list">
          <li><a href="#" rel="noopener">Telegram</a></li>
          <li><a href="#" rel="noopener">ВКонтакте</a></li>
          <li><a href="#" rel="noopener">Яндекс Карты</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-title">Навигация</h4>
        <ul class="footer-list">
          <li><a href="#services">Услуги и цены</a></li>
          <li><a href="#masters">Мастера</a></li>
          <li><a href="#reviews">Отзывы</a></li>
          <li><a href="#booking">Запись</a></li>
        </ul>
      </div>
    </div>

    <div class="container footer-bottom">
      <p>© {{ year }} Барбершоп «Лезвие», Подольск</p>
      <p>ИП Иванов А. А. · ИНН 000000000000</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
  padding: 64px 0 0;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 48px;
}

.footer-logo {
  font-family: var(--font-head);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.18em;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.footer-logo span {
  color: var(--gold);
  font-size: 20px;
}

.footer-desc {
  color: var(--muted);
  font-size: 14px;
  max-width: 280px;
}

.footer-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--gold);
  margin-bottom: 18px;
}

.footer-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  color: var(--muted);
}

.footer-list a {
  transition: color 0.2s;
}

.footer-list a:hover {
  color: var(--gold);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  border-top: 1px solid var(--line);
  padding: 20px;
  font-size: 13px;
  color: var(--muted);
}

@media (max-width: 860px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 520px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>

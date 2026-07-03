<template>
  <section id="contacts" class="section map-section">
    <div class="container">
      <div class="reveal">
        <span class="section-tag">Контакты</span>
        <h2 class="section-title">Как нас найти</h2>
        <p class="section-sub">
          Центр Подольска, две минуты пешком от станции. Парковка — во дворе.
        </p>
      </div>

      <div class="map-wrap reveal">
        <div class="map-info">
          <div class="map-info-block">
            <h3>Адрес</h3>
            <p>г. Подольск,<br />Революционный проспект, 25</p>
          </div>
          <div class="map-info-block">
            <h3>Часы работы</h3>
            <p>Ежедневно<br />10:00 – 21:00</p>
          </div>
          <div class="map-info-block">
            <h3>Телефон</h3>
            <p>
              <a href="tel:+74967000000">+7 (4967) 00-00-00</a>
            </p>
          </div>
          <a href="#booking" class="btn btn-solid map-cta">Записаться</a>
        </div>

        <div class="map-frame">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=37.554797%2C55.430727&z=16&pt=37.554797%2C55.430727%2Cpm2ntm"
            title="Барбершоп ЛЕЗВИЕ на карте Подольска"
            loading="lazy"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.map-section {
  background: var(--bg-soft);
}

.map-wrap {
  display: grid;
  grid-template-columns: 320px 1fr;
  border: 1px solid var(--line);
  background: var(--bg-card);
}

.map-info {
  padding: 40px 36px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.map-info-block h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--gold);
  letter-spacing: 0.14em;
  margin-bottom: 8px;
}

.map-info-block p {
  color: var(--text);
  font-size: 15px;
  line-height: 1.5;
}

.map-info-block a {
  transition: color 0.2s;
}

.map-info-block a:hover {
  color: var(--gold);
}

.map-cta {
  margin-top: auto;
  text-align: center;
}

.map-frame {
  min-height: 420px;
}

.map-frame iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  filter: grayscale(35%);
}

@media (max-width: 820px) {
  .map-wrap {
    grid-template-columns: 1fr;
  }

  .map-frame {
    min-height: 340px;
  }

  .map-cta {
    margin-top: 4px;
  }
}
</style>

<script setup>
import interior from '../assets/gallery/interior.jpg'
import royalShave from '../assets/gallery/royal-shave.jpg'
import clipper from '../assets/gallery/clipper.jpg'
import beard from '../assets/gallery/beard.jpg'
import fade from '../assets/gallery/fade.jpg'
import kids from '../assets/gallery/kids.jpg'

const works = [
  { photo: fade, label: 'Fade под машинку' },
  { photo: beard, label: 'Оформление бороды' },
  { photo: royalShave, label: 'Королевское бритьё' },
  { photo: clipper, label: 'Окантовка' },
  { photo: kids, label: 'Детская стрижка' },
  { photo: interior, label: 'Наш зал' },
]
</script>

<template>
  <section id="gallery" class="section">
    <div class="container">
      <div class="reveal">
        <span class="section-tag">Галерея</span>
        <h2 class="section-title">Наши работы</h2>
        <p class="section-sub">
          Немного того, что происходит в наших креслах каждый день.
        </p>
      </div>

      <div class="gallery-grid">
        <figure v-for="work in works" :key="work.label" class="work reveal">
          <img :src="work.photo" :alt="work.label" loading="lazy" />
          <figcaption class="work-label">{{ work.label }}</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.work {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border: 1px solid var(--line);
  margin: 0;
}

.work img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.05);
  transition: filter 0.35s ease, transform 0.35s ease;
}

.work:hover img {
  filter: grayscale(15%) contrast(1.02);
  transform: scale(1.04);
}

.work-label {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 14px 18px;
  background: linear-gradient(transparent, rgba(10, 10, 12, 0.85));
  color: var(--gold);
  font-family: var(--font-head);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.work:hover .work-label {
  opacity: 1;
  transform: none;
}

@media (hover: none) {
  .work-label {
    opacity: 1;
    transform: none;
  }
}
</style>

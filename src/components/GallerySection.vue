<script setup>
import { ref, watch, onUnmounted } from 'vue'
import interior from '../assets/gallery/interior.jpg'
import royalShave from '../assets/gallery/royal-shave.jpg'
import clipper from '../assets/gallery/clipper.jpg'
import beard from '../assets/gallery/beard.jpg'
import fade from '../assets/gallery/fade.jpg'
import atWork from '../assets/gallery/at-work.jpg'

const works = [
  { photo: fade, label: 'Fade под машинку' },
  { photo: beard, label: 'Оформление бороды' },
  { photo: royalShave, label: 'Королевское бритьё' },
  { photo: clipper, label: 'Окантовка' },
  { photo: atWork, label: 'Мастер за работой' },
  { photo: interior, label: 'Наш зал' },
]

const current = ref(-1)

const open = (i) => (current.value = i)
const close = () => (current.value = -1)
const prev = () => (current.value = (current.value + works.length - 1) % works.length)
const next = () => (current.value = (current.value + 1) % works.length)

function onKey(e) {
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
}

watch(current, (val, old) => {
  const isOpen = val >= 0
  const wasOpen = old >= 0
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen && !wasOpen) window.addEventListener('keydown', onKey)
  if (!isOpen && wasOpen) window.removeEventListener('keydown', onKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
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
        <button
          v-for="(work, i) in works"
          :key="work.label"
          type="button"
          class="work reveal"
          :aria-label="`Открыть фото: ${work.label}`"
          @click="open(i)"
        >
          <img :src="work.photo" :alt="work.label" loading="lazy" />
          <span class="work-label">{{ work.label }}</span>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="lb">
        <div
          v-if="current >= 0"
          class="lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="works[current].label"
          @click.self="close"
        >
          <button type="button" class="lb-close" aria-label="Закрыть просмотр" @click="close">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>

          <button type="button" class="lb-arrow lb-prev" aria-label="Предыдущее фото" @click="prev">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>

          <figure class="lb-figure">
            <img :src="works[current].photo" :alt="works[current].label" />
            <figcaption class="lb-caption">
              {{ works[current].label }}
              <span class="lb-counter">{{ current + 1 }} / {{ works.length }}</span>
            </figcaption>
          </figure>

          <button type="button" class="lb-arrow lb-next" aria-label="Следующее фото" @click="next">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
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
  padding: 0;
  background: var(--bg-card);
  display: block;
  cursor: zoom-in;
}

.work img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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
  text-align: left;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.work:hover .work-label,
.work:focus-visible .work-label {
  opacity: 1;
  transform: none;
}

@media (hover: none) {
  .work-label {
    opacity: 1;
    transform: none;
  }
}

/* ---- Лайтбокс ---- */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(10, 10, 12, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
}

.lb-figure {
  margin: 0;
  max-width: min(1000px, 84vw);
  text-align: center;
}

.lb-figure img {
  max-width: 100%;
  max-height: 78vh;
  object-fit: contain;
  border: 1px solid var(--line);
}

.lb-caption {
  margin-top: 16px;
  color: var(--gold);
  font-family: var(--font-head);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 14px;
}

.lb-counter {
  color: var(--muted);
  font-size: 13px;
  letter-spacing: 0.08em;
}

.lb-close,
.lb-arrow {
  background: transparent;
  border: 1px solid var(--line);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, color 0.2s;
  flex-shrink: 0;
}

.lb-close:hover,
.lb-arrow:hover {
  border-color: var(--gold);
  color: var(--gold);
}

.lb-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
}

.lb-arrow {
  width: 52px;
  height: 52px;
  border-radius: 50%;
}

/* появление */
.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.25s ease;
}

.lb-enter-active .lb-figure,
.lb-leave-active .lb-figure {
  transition: transform 0.25s ease;
}

.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}

.lb-enter-from .lb-figure,
.lb-leave-to .lb-figure {
  transform: scale(0.96);
}

@media (max-width: 640px) {
  .lightbox {
    padding: 12px;
    gap: 6px;
  }

  .lb-arrow {
    width: 42px;
    height: 42px;
  }

  .lb-close {
    top: 12px;
    right: 12px;
    width: 42px;
    height: 42px;
  }
}
</style>

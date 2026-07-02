<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { href: '#services', label: 'Услуги' },
  { href: '#advantages', label: 'О нас' },
  { href: '#masters', label: 'Мастера' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#contacts', label: 'Контакты' },
]

function onScroll() {
  scrolled.value = window.scrollY > 30
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="header" :class="{ scrolled }">
    <div class="container header-inner">
      <a href="#" class="logo">
        <span class="logo-mark">✂</span>
        ЛЕЗВИЕ
      </a>

      <nav class="nav" :class="{ open: menuOpen }">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="nav-link"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </a>
        <a href="#booking" class="btn btn-solid nav-cta" @click="menuOpen = false">Записаться</a>
      </nav>

      <button
        class="burger"
        :class="{ active: menuOpen }"
        aria-label="Меню"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  padding: 22px 0;
  transition: background 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease;
}

.header.scrolled {
  background: rgba(14, 14, 16, 0.92);
  backdrop-filter: blur(12px);
  padding: 14px 0;
  box-shadow: 0 1px 0 var(--line);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.logo {
  font-family: var(--font-head);
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.18em;
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-mark {
  color: var(--gold);
  font-size: 22px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 34px;
}

.nav-link {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text);
  position: relative;
  transition: color 0.2s;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 0;
  height: 1px;
  background: var(--gold);
  transition: width 0.25s ease;
}

.nav-link:hover {
  color: var(--gold);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-cta {
  padding: 11px 26px;
  font-size: 13px;
}

.burger {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  padding: 6px;
}

.burger span {
  display: block;
  width: 26px;
  height: 2px;
  background: var(--text);
  transition: transform 0.3s, opacity 0.3s;
}

.burger.active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.burger.active span:nth-child(2) {
  opacity: 0;
}

.burger.active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 860px) {
  .burger {
    display: flex;
  }

  .nav {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: min(320px, 80vw);
    background: var(--bg-soft);
    flex-direction: column;
    justify-content: center;
    padding: 40px;
    transform: translateX(100%);
    transition: transform 0.35s ease;
    box-shadow: -20px 0 60px rgba(0, 0, 0, 0.5);
  }

  .nav.open {
    transform: translateX(0);
  }
}
</style>

<script setup>
import { onMounted } from 'vue'
import TheHeader from './components/TheHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import AdvantagesSection from './components/AdvantagesSection.vue'
import MastersSection from './components/MastersSection.vue'
import GallerySection from './components/GallerySection.vue'
import ReviewsSection from './components/ReviewsSection.vue'
import BookingSection from './components/BookingSection.vue'
import MapSection from './components/MapSection.vue'
import TheFooter from './components/TheFooter.vue'
import PrivacyPolicy from './components/PrivacyPolicy.vue'

const props = defineProps({
  page: { type: String, default: 'home' },
})

// Какие секции на какой странице (страницы — HTML-файлы в корне проекта)
const pageSections = {
  home: [HeroSection, AdvantagesSection, ReviewsSection],
  services: [ServicesSection],
  masters: [MastersSection],
  gallery: [GallerySection],
  booking: [BookingSection],
  contacts: [MapSection],
}

const sections = pageSections[props.page] || pageSections.home

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 }
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<template>
  <TheHeader :page="page" />
  <main :class="{ 'page-inner': page !== 'home' }">
    <component :is="section" v-for="(section, i) in sections" :key="i" />
  </main>
  <TheFooter />
  <PrivacyPolicy />
</template>

<script setup>
import { onMounted } from 'vue'
import TheHeader from './components/TheHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import AdvantagesSection from './components/AdvantagesSection.vue'
import MastersSection from './components/MastersSection.vue'
import ReviewsSection from './components/ReviewsSection.vue'
import BookingSection from './components/BookingSection.vue'
import MapSection from './components/MapSection.vue'
import TheFooter from './components/TheFooter.vue'

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
  <TheHeader />
  <main>
    <HeroSection />
    <ServicesSection />
    <AdvantagesSection />
    <MastersSection />
    <ReviewsSection />
    <BookingSection />
    <MapSection />
  </main>
  <TheFooter />
</template>

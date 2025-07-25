<script setup>
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>

<template>

  <div class="flex min-h-screen flex-col font-body text-base text-gray-800 bg-white">
    <Header />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <Footer />
  </div>
  <SpeedInsights />
</template>

<template>
  <footer class="bg-gradient-to-r from-white via-gray-50 to-white text-gray-700 text-sm drop-shadow-md">
    <div
      class="max-w-6xl mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8"
    >
      <!-- Left: Copyright -->
      <div class="text-center md:text-left text-gray-400 font-light select-none tracking-wide">
        © {{ new Date().getFullYear() }} Sprigggy. All rights reserved.
      </div>

      <!-- Middle: Stats -->
      <StatsWidget />

      <!-- Right: Links -->
      <nav
        class="flex flex-wrap justify-center md:justify-end gap-8 text-gray-600 font-semibold"
        aria-label="Footer navigation"
      >
        <a
          href="/about"
          class="relative group before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
          >About</a
        >
        <a
          href="/dmca"
          class="relative group before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
          >DMCA Policy</a
        >
        <a
          href="/privacy"
          class="relative group before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
          >Privacy</a
        >
      </nav>
    </div>
  </footer>
</template>

<script setup>
import StatsWidget from '@/components/StatsWidget.vue'
</script>

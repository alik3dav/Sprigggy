<template>
  <header class="fixed top-0 inset-x-0 z-50 backdrop-blur-lg bg-white bg-opacity-90">
    <div class="w-full px-6 sm:px-12 md:px-16 lg:px-24 py-8 mx-auto flex items-center justify-between gap-6">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center space-x-2" aria-label="Sprigggy Home">
        <img src="/sprigggy.png" alt="Sprigggy logo" class="w-20 sm:w-24 h-auto" />
        <span class="sr-only">Sprigggy</span>
      </NuxtLink>

      <!-- Search (Desktop) -->
      <div class="hidden md:flex flex-1 justify-center">
        <SearchAssets class="w-full max-w-sm rounded-full shadow-sm" />
      </div>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex gap-6 text-gray-700 font-medium text-sm font-body">
        <NuxtLink
          to="/"
          class="relative group transition-colors"
          active-class="text-black font-medium"
          exact
        >
          Home
          <span class="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </NuxtLink>
        <NuxtLink
          to="/collections"
          class="relative group transition-colors"
          active-class="text-black font-medium"
        >
          Collections
          <span class="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="relative group transition-colors"
          active-class="text-black font-medium"
        >
          About
          <span class="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </NuxtLink>
      </nav>

      <!-- Mobile Menu Toggle -->
      <button
        @click="toggleMobile"
        class="md:hidden p-2 rounded-lg hover:bg-gray-100/40 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
        aria-label="Toggle menu"
        :aria-expanded="mobileOpen.toString()"
      >
        <svg
          v-if="!mobileOpen"
          class="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          class="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Nav -->
    <transition name="fade-slide">
      <div
        v-if="mobileOpen"
        class="md:hidden mx-4 mt-2 px-6 pt-4 pb-6 rounded-xl shadow-md bg-white/80 backdrop-blur text-gray-700 font-medium text-sm font-body"
      >
        <NuxtLink to="/" @click="toggleMobile" class="block hover:text-black transition">Home</NuxtLink>
        <NuxtLink to="/collections" @click="toggleMobile" class="block hover:text-black transition">Collections</NuxtLink>
        <NuxtLink to="/about" @click="toggleMobile" class="block hover:text-black transition">About</NuxtLink>
        <SearchAssets class="w-full rounded-full shadow-sm mt-4" />
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const mobileOpen = ref(false)
const toggleMobile = () => {
  mobileOpen.value = !mobileOpen.value
}
</script>

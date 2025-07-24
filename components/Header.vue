<template>
  <header class="bg-white shadow-md border-b border-gray-200">
    <div
      class="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between gap-6"
    >
      <!-- Left: Logo -->
      <NuxtLink
        to="/"
        class="flex items-center space-x-3"
        aria-label="ZippyKit Home"
      >
        <img src="/zippykit.png" alt="ZippyKit logo" class="w-28 h-auto" />
        <span class="sr-only">ZippyKit</span>
      </NuxtLink>

      <!-- Center: Search (hidden on small) -->
      <div class="hidden md:flex flex-1 justify-center">
        <SearchAssets />
      </div>

      <!-- Right: Desktop Nav -->
      <nav class="hidden md:flex gap-8 text-gray-700 font-semibold text-sm tracking-wide">
        <NuxtLink
          to="/"
          class="relative group"
          active-class="text-black font-bold"
          exact
        >
          Home
          <span
            class="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"
          ></span>
        </NuxtLink>
        <NuxtLink
          to="/collections"
          class="relative group"
          active-class="text-black font-bold"
        >
          Collections
          <span
            class="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"
          ></span>
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="relative group"
          active-class="text-black font-bold"
        >
          About
          <span
            class="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"
          ></span>
        </NuxtLink>
      </nav>

      <!-- Mobile Toggle -->
      <button
        @click="toggleMobile"
        class="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
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
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          class="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Nav -->
    <transition name="fade-slide">
      <div
        v-if="mobileOpen"
        class="md:hidden px-6 pb-6 space-y-4 text-gray-700 border-t border-gray-200 bg-white"
      >
        <NuxtLink
          to="/"
          class="block font-semibold hover:text-black transition"
          @click="toggleMobile"
          >Home</NuxtLink
        >
        <NuxtLink
          to="/collections"
          class="block font-semibold hover:text-black transition"
          @click="toggleMobile"
          >Collections</NuxtLink
        >
        <NuxtLink
          to="/about"
          class="block font-semibold hover:text-black transition"
          @click="toggleMobile"
          >About</NuxtLink
        >
        <SearchAssets class="w-full rounded-3xl " />
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

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

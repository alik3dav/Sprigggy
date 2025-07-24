<template>
  <header class="bg-white shadow-sm border-b">
    <div
      class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4"
    >
      <!-- Left: Logo -->
      <NuxtLink
        to="/"
        class="text-xl font-bold text-gray-900 whitespace-nowrap"
      >
        <img src="/zippykit.png" alt="/zippykit.png" class="w-24 h-auto">
      </NuxtLink>

      <!-- Center: Search (hidden on small) -->
      <div class="hidden md:block px-4">
        <SearchAssets />
      </div>

      <!-- Right: Desktop Nav -->
      <nav class="hidden md:flex gap-6 text-sm text-gray-700 font-medium">
        <NuxtLink to="/" class="hover:text-black transition">Home</NuxtLink>
        <NuxtLink to="/collections" class="hover:text-black transition"
          >Collections</NuxtLink
        >
        <NuxtLink to="/about" class="hover:text-black transition"
          >About</NuxtLink
        >
      </nav>

      <!-- Mobile Toggle -->
      <button
        @click="toggleMobile"
        class="md:hidden text-gray-700"
        aria-label="Menu"
      >
        <svg
          v-if="!mobileOpen"
          class="w-6 h-6"
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
          class="w-6 h-6"
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
    <div
      v-if="mobileOpen"
      class="md:hidden px-4 pb-4 space-y-2 text-gray-700 border-t border-gray-200"
    >
      <NuxtLink to="/" class="block hover:text-black transition">Home</NuxtLink>
      <NuxtLink to="/collections" class="block hover:text-black transition"
        >Collections</NuxtLink
      >
      <NuxtLink to="/about" class="block hover:text-black transition"
        >About</NuxtLink
      >
      <SearchAssets class="w-full" />
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const mobileOpen = ref(false);
const toggleMobile = () => {
  mobileOpen.value = !mobileOpen.value;
};
</script>

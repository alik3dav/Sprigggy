<template>
  <footer class="bg-gray-100 text-gray-600 text-sm">
    <div
      class="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div class="text-center sm:text-left">
        © {{ new Date().getFullYear() }} Zippykit. All rights reserved.
      </div>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="/about" class="hover:text-black transition">About</a>
        <a href="/dmca" class="hover:text-black transition">DMCA Policy</a>
        <a href="/privacy" class="hover:text-black transition">Privacy</a>
      </div>
    </div>
  </footer>
</template>

<template>
  <footer class="bg-gray-100 text-gray-600 text-sm">
    <div
      class="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div class="text-center sm:text-left">
        © {{ new Date().getFullYear() }} Zippykit. All rights reserved.
      </div>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="#" class="hover:text-black transition">About</a>
        <a href="#" class="hover:text-black transition">Terms</a>
        <a href="#" class="hover:text-black transition">Privacy</a>
        <a href="#" class="hover:text-black transition">Contact</a>
      </div>
    </div>
  </footer>
</template>

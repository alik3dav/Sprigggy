<template>
  <section class="relative overflow-hidden bg-white py-10 px-4 sm:px-8 text-center font-body">
    <div class="max-w-3xl mx-auto z-10 relative">

      <!-- Title with sprig icon -->
      <h1 class="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900 leading-tight mb-6 flex items-center justify-center gap-3">
        <SprigIcon class="w-8 h-8 text-green-500" />
        <span>
          Fresh &amp; Free  
          <span class="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
            Design Assets
          </span>
        </span>
      </h1>

      <p class="text-sm sm:text-base text-gray-600 mb-8 max-w-lg mx-auto">
        Grow your creative toolkit with open-source templates, plugins, and tools — free forever.
      </p>

      <NuxtLink to="/collections" class="inline-block">
        <button
          class="bg-green-100 text-green-800 font-medium text-sm px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:bg-green-200 transition-all"
        >
          🌿 Browse Collections
        </button>
      </NuxtLink>

    </div>
  </section>
</template>

<script setup>
const SprigIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" >
      <path d="M12 2C10 6 7 8 4 10c3 1 6 4 8 8 2-5 3-8 0-16z"/>
    </svg>
  `
}
</script>

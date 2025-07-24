<template>
  <section class="relative overflow-hidden bg-white py-10 px-4 sm:px-8 text-center font-body">
    <div class="max-w-3xl mx-auto z-10 relative">
      <h1 class="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900 leading-tight mb-3">
        Free, High-Quality  
        <span class="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Design Assets
        </span>
      </h1>

      <p class="text-sm sm:text-base text-gray-600 mb-6 max-w-lg mx-auto">
        Pro-grade templates, plugins & tools — 100% free, forever.
      </p>

      <NuxtLink to="/collections" class="inline-block">
        <button
          class="bg-white/10 backdrop-blur-sm border border-zinc-300 text-zinc-800 font-medium text-sm px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:bg-white transition-all"
        >
          🎨 Browse Collections
        </button>
      </NuxtLink>

      <div class="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-800 text-xs sm:text-sm">
        <div class="flex flex-col items-center">
          <div class="text-xl font-bold font-heading text-zinc-900">500+</div>
          <div class="uppercase tracking-wider text-gray-400">Templates</div>
        </div>
        <div class="flex flex-col items-center">
          <div class="text-xl font-bold font-heading text-zinc-900">200+</div>
          <div class="uppercase tracking-wider text-gray-400">Plugins</div>
        </div>
        <div class="flex flex-col items-center">
          <div class="text-xl font-bold font-heading text-zinc-900">100+</div>
          <div class="uppercase tracking-wider text-gray-400">Software</div>
        </div>
        <div class="flex flex-col items-center">
          <div class="text-xl font-bold font-heading text-zinc-900">50+</div>
          <div class="uppercase tracking-wider text-gray-400">Courses</div>
        </div>
      </div>
    </div>
  </section>
</template>


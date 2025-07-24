<template>
  <section class="relative overflow-hidden bg-white py-20 px-6 sm:px-10 text-center font-body">
    <div class="max-w-3xl mx-auto z-10 relative">
      <h1 class="text-4xl sm:text-5xl font-heading font-extrabold text-gray-900 leading-tight sm:leading-snug mb-5">
        Free, High-Quality<br />
        <span class="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Design Assets
        </span>
      </h1>

      <p class="text-base sm:text-lg text-gray-600 mb-10 max-w-xl mx-auto">
        Download pro-grade templates, plugins, 3D assets, and creative tools — 100% free, forever.
      </p>

      <NuxtLink to="/collections" class="inline-block">
        <button
          class="bg-white/10 backdrop-blur-sm border border-zinc-300 text-zinc-800 font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 rounded-full shadow hover:shadow-md hover:bg-white transition-all"
        >
          🎨 Browse Collections
        </button>
      </NuxtLink>

      <div class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-gray-800 text-sm sm:text-base">
        <div class="flex flex-col items-center">
          <div class="text-3xl font-extrabold font-heading text-zinc-900">500+</div>
          <div class="uppercase tracking-wider text-gray-400 text-xs">Templates</div>
        </div>
        <div class="flex flex-col items-center">
          <div class="text-3xl font-extrabold font-heading text-zinc-900">200+</div>
          <div class="uppercase tracking-wider text-gray-400 text-xs">Plugins</div>
        </div>
        <div class="flex flex-col items-center">
          <div class="text-3xl font-extrabold font-heading text-zinc-900">100+</div>
          <div class="uppercase tracking-wider text-gray-400 text-xs">Software</div>
        </div>
        <div class="flex flex-col items-center">
          <div class="text-3xl font-extrabold font-heading text-zinc-900">50+</div>
          <div class="uppercase tracking-wider text-gray-400 text-xs">Courses</div>
        </div>
      </div>
    </div>
  </section>
</template>

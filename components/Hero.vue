<template>
  <section class="bg-white py-12 px-6 sm:px-10 text-center relative overflow-hidden">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-snug mb-4">
        Free High-Quality Design Assets
      </h1>
      <p class="text-base sm:text-lg text-gray-600 mb-8 max-w-lg mx-auto">
        Download pro-grade templates, plugins, software, and courses — all 100% free.
      </p>

      <NuxtLink to="/collections" class="inline-block">
        <button
          class="bg-zinc-700 text-white text-sm sm:text-base font-semibold px-6 sm:px-8 py-2.5 rounded-full shadow-md hover:brightness-110 transition"
        >
          Browse Collections
        </button>
      </NuxtLink>

      <div
        class="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 text-gray-800 font-semibold text-xs sm:text-sm"
      >
        <div class="space-y-0.5">
          <div class="text-2xl sm:text-3xl font-extrabold">500+</div>
          <div class="uppercase tracking-widest text-gray-400">Templates</div>
        </div>
        <div class="space-y-0.5">
          <div class="text-2xl sm:text-3xl font-extrabold">200+</div>
          <div class="uppercase tracking-widest text-gray-400">Plugins</div>
        </div>
        <div class="space-y-0.5">
          <div class="text-2xl sm:text-3xl font-extrabold">100+</div>
          <div class="uppercase tracking-widest text-gray-400">Software</div>
        </div>
        <div class="space-y-0.5">
          <div class="text-2xl sm:text-3xl font-extrabold">50+</div>
          <div class="uppercase tracking-widest text-gray-400">Courses</div>
        </div>
      </div>
    </div>

    <div
      class="pointer-events-none absolute top-0 left-0 w-36 h-36 bg-gradient-to-br from-indigo-300 to-blue-400 rounded-full opacity-15 -translate-x-1/3 -translate-y-1/3"
    ></div>
    <div
      class="pointer-events-none absolute bottom-0 right-0 w-36 h-36 bg-gradient-to-tr from-purple-300 to-pink-400 rounded-full opacity-15 translate-x-1/3 translate-y-1/3"
    ></div>
  </section>
</template>

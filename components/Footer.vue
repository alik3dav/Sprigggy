<template>
  <footer class="w-full mt-24 bg-white border-t border-zinc-200 text-gray-700 text-sm">
    <div class=" w-full px-24 mx-auto py-12 flex flex-col md:flex-row items-center justify-between gap-6">
      <!-- Left: Copyright -->
      <div class="text-center md:text-left text-gray-400 font-light tracking-wide select-none">
        © {{ new Date().getFullYear() }} Sprigggy. All rights reserved.
      </div>



      <!-- Right: Links -->
      <nav class="flex gap-6 text-gray-500 font-medium">
        <NuxtLink
          to="/terms"
          class="hover:text-black transition-colors relative after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1.5px] after:bg-gray-800 after:transition-all after:duration-300 hover:after:w-full"
        >
          Terms
        </NuxtLink>
        <NuxtLink
          to="/privacy"
          class="hover:text-black transition-colors relative after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1.5px] after:bg-gray-800 after:transition-all after:duration-300 hover:after:w-full"
        >
          Privacy
        </NuxtLink>
        <NuxtLink
          to="/cookies"
          class="hover:text-black transition-colors relative after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1.5px] after:bg-gray-800 after:transition-all after:duration-300 hover:after:w-full"
        >
          Cookies
        </NuxtLink>
      </nav>
    </div>
  </footer>
</template>


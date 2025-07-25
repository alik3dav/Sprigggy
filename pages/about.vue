<template>
  <section class="bg-white mt-24 py-20 px-4 sm:px-8 font-body text-gray-800">
    <!-- Page Intro -->
    <div class="max-w-3xl mx-auto text-center mb-16">
      <h1 class="text-3xl sm:text-4xl font-heading font-extrabold mb-4">
        About Sprigggy
      </h1>
      <p class="text-base sm:text-lg text-gray-600">
        Sprigggy is a free, open-source platform offering high-quality design assets — built to empower creatives everywhere.
      </p>
    </div>

    <!-- Our Story -->
    <div class="max-w-4xl mx-auto space-y-10">
      <div>
        <h2 class="text-xl font-semibold mb-2">Why we built this</h2>
        <p class="text-sm sm:text-base text-gray-600 leading-relaxed">
          Good design tools shouldn’t be hidden behind paywalls or buried in cluttered marketplaces. Sprigggy was created to make creative resources fast, accessible, and beautifully organized — with no fluff or friction.
        </p>
      </div>

      <div>
        <h2 class="text-xl font-semibold mb-2">Our mission</h2>
        <p class="text-sm sm:text-base text-gray-600 leading-relaxed">
          We’re building a home for creators — a clean, simple place to discover, share, and use high-quality assets. Sprigggy isn’t just about files — it’s about freeing up time and focus so designers can do what they do best.
        </p>
      </div>

      <div>
        <h2 class="text-xl font-semibold mb-2">What we value</h2>
        <ul class="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-2">
          <li>✨ Simplicity over noise</li>
          <li>🎁 Free and open access</li>
          <li>💬 Community-driven growth</li>
          <li>🧠 Smart, purposeful design</li>
        </ul>
      </div>
    </div>

    <!-- CTA -->
    <div class="mt-20 text-center">
      <NuxtLink to="/collections">
        <button
          class="bg-zinc-900 text-white px-6 py-3 rounded-full font-medium hover:bg-zinc-800 transition"
        >
          🎨 Browse Collections 
        </button>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
useHead({
  title: 'About Sprigggy – Free Design Asset Platform',
  meta: [
    {
      name: 'description',
      content:
        'Learn more about Sprigggy — an open-source platform for free, high-quality design assets built to empower creators around the world.',
    },
    { property: 'og:title', content: 'About Sprigggy – Free Design Asset Platform' },
    {
      property: 'og:description',
      content:
        'Discover the mission and story behind Sprigggy. We’re building a clean, free platform for designers to share and use creative assets with zero friction.',
    },
    { property: 'og:image', content: 'https://sprigggy.com/og-image-about.jpg' }, // <- set correct path
    { property: 'og:url', content: 'https://sprigggy.com/about' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [{ rel: 'canonical', href: 'https://sprigggy.com/about' }]
});
</script>

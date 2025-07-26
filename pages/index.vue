<template>
  <Hero class="mt-24" />

  <section class="w-full border-b  mb-8 pb-8  px-6 sm:px-12 md:px-16 lg:px-24 space-y-8">
    <h1 class="text-2xl font-bold mb-4">Recently Added Files</h1>

    <!-- Grid of cards -->
    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6"
    >
    <!-- v-for="(item, i) in (recent || []).filter(asset => asset.type === '3d')" -->
    <AssetCard
    v-for="(item, i) in (recent || []).slice(0, 5)"
  :key="item.id || i"
  :title="item.title"
  :type="item.type"
  :image="item.image"
  :link="`/assets/${item.id}`"
  :tags="item.tags"
  :downloads="item.downloads"
  :openSource="item.open_source"
/>

    </div>

  </section>


  <section class="w-full px-6 sm:px-12 md:px-16 lg:px-24 py-12">
  <div class="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
    <!-- Left: Headline, description, see all -->
    <div class="lg:col-span-1 flex flex-col justify-center space-y-6">
      <h2 class="text-4xl font-extrabold tracking-tight text-gray-900">
        HDRI Maps
      </h2>
      <p class="text-gray-600 text-lg max-w-md">
        Explore our curated selection of high-quality HDRI maps, perfect for lighting your 3D scenes with stunning realism!
      </p>
      <NuxtLink
        to="/collections"
        class="inline-block text-indigo-600 font-semibold hover:text-indigo-500 transition"
        aria-label="See all HDRI Maps"
      >
        See All HDRI Maps &rarr;
      </NuxtLink>
    </div>

    <!-- Right: 3 Cards -->
    <div class="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <AssetCard
        v-for="(item, i) in (recent || []).filter(asset => asset.type === 'HDRI').slice(0, 3)"
        :key="item.id || i"
        :title="item.title"
        :type="item.type"
        :image="item.image"
        :link="`/assets/${item.id}`"
        :tags="item.tags"
        :downloads="item.downloads"
        :openSource="item.open_source"
      />
    </div>
  </div>
</section>



</template>

<script setup>
import { ref, onMounted } from 'vue';
const supabase = useSupabaseClient();



const recent = ref([]);


onMounted(async () => {
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .order('date', { ascending: false })
    .limit(12);

  if (error) console.error(error);
  else recent.value = data;
});

useHead({
  title: 'Sprigggy – Free Open Source Design Assets',
  meta: [
    {
      name: 'description',
      content:
        'Sprigggy offers beautiful, free, and open-source design assets — from templates to 3D elements. Perfect for creatives, developers, and makers.',
    },
    {
      name: 'keywords',
      content:
        'free design assets, open source templates, figma ui kits, 3d assets, sprigggy, design tools, creative resources, open design',
    },
    { property: 'og:title', content: 'Sprigggy – Free Design Assets' },
    {
      property: 'og:description',
      content:
        'Explore a curated, open-source library of creative tools, templates, 3D files and more — all free, forever.',
    },
    {
      property: 'og:image',
      content: 'https://sprigggy.com/og-image.jpg', // Replace with your real OG image URL
    },
    { property: 'og:url', content: 'https://sprigggy.com' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  link: [{ rel: 'canonical', href: 'https://sprigggy.com' }],
});


</script>

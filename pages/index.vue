<template>
  <Hero class="mt-24" />
  <section class="w-full px-24 space-y-8">
    <h1 class="text-2xl font-bold mb-4">Recently Added Files</h1>

    <!-- Grid of cards -->
    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
    >
      <AssetCard
        v-for="(item, i) in recent"
        :key="item.id || i"
        v-bind="{ ...item, link: `/assets/${item.id}` }"
      />
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

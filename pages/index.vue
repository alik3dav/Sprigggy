<template>
  <Hero class="mt-24" />
  <section class="max-w-6xl mx-auto p-2 space-y-8">
    <h1 class="text-2xl font-bold mb-4">Recently Added Files</h1>

    <!-- Grid of cards -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
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
  title: 'Free Design Assets & Templates | ZippyKit',
  meta: [
    {
      name: 'description',
      content: 'Download free design templates, plugins, mockups and more. Curated and useful assets for creatives.',
    },
    {
      name: 'keywords',
      content: 'free design templates, figma files, ui kits, mockups, zippykit, design tools',
    },
    { property: 'og:title', content: 'ZippyKit – Free Design Assets' },
    {
      property: 'og:description',
      content: 'Explore a curated library of free design tools, templates, and plugins.',
    },
    {
      property: 'og:image',
      content: 'https://zippykit.com/og-image.jpg', // Replace with your actual image
    },
    { property: 'og:url', content: 'https://zippykit.com' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  link: [{ rel: 'canonical', href: 'https://zippykit.com' }],
})

</script>

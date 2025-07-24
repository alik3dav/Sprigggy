<template>
  <Hero />
  <section class="max-w-6xl mx-auto p-4 space-y-8">
    <h1 class="text-2xl font-bold mb-4">Recently Added Files</h1>

    <!-- Grid of cards -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
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
</script>

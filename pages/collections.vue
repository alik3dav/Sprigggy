<template>
  <div class="max-w-6xl mx-auto mt-24 p-4 space-y-8">
    <h1 class="text-2xl font-bold">All Assets</h1>

    <!-- Filters -->
    <div class="flex flex-wrap gap-3 items-center border-b pb-4 text-sm">
      <select v-model="selectedCategory" class="border rounded px-3 py-1">
        <option value="">All Categories</option>
        <option v-for="type in types" :key="type" :value="type">
          {{ type }}
        </option>
      </select>

      <select v-model="selectedTag" class="border rounded px-3 py-1">
        <option value="">All Tags</option>
        <option v-for="tag in allTags" :key="tag" :value="tag">
          {{ tag }}
        </option>
      </select>

      <select v-model="sortOrder" class="border rounded px-3 py-1">
        <option value="recent">Recently Added</option>
        <option value="popular">Most Popular</option>
      </select>
    </div>

    <!-- Asset Grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <AssetCard
        v-for="(item, i) in recent"
        :key="item.id || i"
        v-bind="{ ...item, link: `/assets/${item.id}` }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
const supabase = useSupabaseClient();

const recent = ref([]);
const selectedCategory = ref('');
const selectedTag = ref('');
const sortOrder = ref('recent');

const types = ref([]);
const allTags = ref([]);

// Fetch all asset types and tags for filter dropdowns
const loadFilters = async () => {
  const { data, error } = await supabase.from('assets').select('type, tags');
  if (!error && data) {
    types.value = [...new Set(data.map((item) => item.type).filter(Boolean))];
    const tagSet = new Set();
    data.forEach((item) => {
      (item.tags || []).forEach((tag) => tagSet.add(tag));
    });
    allTags.value = Array.from(tagSet);
  }
};

// Load assets based on filters
const loadAssets = async () => {
  let query = supabase.from('assets').select('*');

  if (selectedCategory.value) {
    query = query.eq('type', selectedCategory.value);
  }

  if (selectedTag.value) {
    query = query.contains('tags', [selectedTag.value]);
  }

  if (sortOrder.value === 'recent') {
    query = query.order('date', { ascending: false });
  } else if (sortOrder.value === 'popular') {
    query = query.order('downloads', { ascending: false });
  }

  const { data, error } = await query;
  if (!error) recent.value = data;
};

onMounted(async () => {
  await loadFilters();
  await loadAssets();
});

// Watch filters and reload on change
watchEffect(() => {
  loadAssets();
});
</script>

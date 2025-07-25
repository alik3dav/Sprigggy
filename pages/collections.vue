<template>
  <div class="w-full p-24 space-y-8 mt-24 ">
    <h1 class="text-2xl font-bold">All Assets</h1>


<!-- Filters -->
<div class="flex flex-wrap gap-3 items-center border-b border-gray-200 pb-4 text-sm">
  <!-- Category Dropdown -->
  <Listbox v-model="selectedCategory" as="div" class="relative w-48">
    <ListboxButton
      class="w-full rounded-full bg-white border border-gray-300 text-gray-700 px-4 py-2 pr-10 text-sm shadow-sm hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      {{ selectedCategory || 'All Categories' }}
      <ChevronDown class="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
    </ListboxButton>
    <ListboxOptions
      class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none"
    >
      <ListboxOption value="" class="cursor-pointer select-none px-4 py-2 hover:bg-blue-50">
        All Categories
      </ListboxOption>
      <ListboxOption
        v-for="type in types"
        :key="type"
        :value="type"
        class="cursor-pointer select-none px-4 py-2 hover:bg-blue-50"
      >
        {{ type }}
      </ListboxOption>
    </ListboxOptions>
  </Listbox>

  <!-- Tag Dropdown -->
  <Listbox v-model="selectedTag" as="div" class="relative w-48">
    <ListboxButton
      class="w-full rounded-full bg-white border border-gray-300 text-gray-700 px-4 py-2 pr-10 text-sm shadow-sm hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      {{ selectedTag || 'All Tags' }}
      <ChevronDown class="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
    </ListboxButton>
    <ListboxOptions
      class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none"
    >
      <ListboxOption value="" class="cursor-pointer select-none px-4 py-2 hover:bg-blue-50">
        All Tags
      </ListboxOption>
      <ListboxOption
        v-for="tag in allTags"
        :key="tag"
        :value="tag"
        class="cursor-pointer select-none px-4 py-2 hover:bg-blue-50"
      >
        {{ tag }}
      </ListboxOption>
    </ListboxOptions>
  </Listbox>

  <!-- Sort Dropdown -->
  <Listbox v-model="sortOrder" as="div" class="relative w-48">
    <ListboxButton
      class="w-full rounded-full bg-white border border-gray-300 text-gray-700 px-4 py-2 pr-10 text-sm shadow-sm hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      {{
        sortOrder === 'recent'
          ? 'Recently Added'
          : sortOrder === 'popular'
          ? 'Most Popular'
          : 'Sort By'
      }}
      <ChevronDown class="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
    </ListboxButton>
    <ListboxOptions
      class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none"
    >
      <ListboxOption value="recent" class="cursor-pointer select-none px-4 py-2 hover:bg-blue-50">
        Recently Added
      </ListboxOption>
      <ListboxOption value="popular" class="cursor-pointer select-none px-4 py-2 hover:bg-blue-50">
        Most Popular
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</div>


    <!-- Asset Grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
    >
    <AssetCard
  v-for="(item, i) in recent"
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
</template>

<script setup>
import { ChevronDown } from 'lucide-vue-next'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
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

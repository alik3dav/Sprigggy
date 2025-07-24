<script setup>
import { ref, watch } from 'vue';

const supabase = useSupabaseClient();
const searchTerm = ref('');
const results = ref([]);
const loading = ref(false);
const error = ref(null);

let debounceTimeout = null;

const debounceSearch = (val) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    doSearch(val);
  }, 300);
};

const doSearch = async (val) => {
  if (!val) {
    results.value = [];
    error.value = null;
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = null;

  const { data, error: err } = await supabase
    .from('assets')
    .select('*')
    .ilike('title', `%${val}%`)
    .order('date', { ascending: false })
    .limit(10);

  if (err) {
    error.value = err.message;
    results.value = [];
  } else {
    results.value = data;
  }
  loading.value = false;
};

watch(searchTerm, (val) => {
  debounceSearch(val.trim());
});
</script>

<template>
  <div :class="$attrs.class"> <!-- SINGLE ROOT with inherited class -->
    <!-- Search Input -->
    <input
      v-model="searchTerm"
      type="search"
      placeholder="Search assets..."
      class="pl-4 pr-14 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 w-full"
    />

    <!-- Loading & Errors -->
    <div v-if="loading" class="absolute top-full mt-2 text-sm text-gray-500">
      Searching...
    </div>
    <div v-if="error" class="absolute top-full mt-2 text-sm text-red-600">
      Error: {{ error }}
    </div>

    <!-- Results -->
    <ul
      v-if="results.length"
      class="absolute z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden"
    >
      <li
        v-for="item in results"
        :key="item.id"
        class="border-b last:border-0 hover:bg-gray-50 transition"
      >
        <NuxtLink
          :to="`/assets/${item.id}`"
          class="block px-4 py-2 text-sm text-gray-800 hover:text-blue-600"
        >
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>

    <p
      v-else-if="searchTerm && !loading"
      class="absolute top-full mt-2 text-sm text-gray-500"
    >
      No results found.
    </p>
  </div>
</template>

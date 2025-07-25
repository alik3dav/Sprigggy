<script setup>
import { ref, watch } from 'vue'

const supabase = useSupabaseClient()
const searchTerm = ref('')
const results = ref([])
const loading = ref(false)
const error = ref(null)

let debounceTimeout = null

const debounceSearch = (val) => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    doSearch(val)
  }, 300)
}

const doSearch = async (val) => {
  if (!val) {
    results.value = []
    error.value = null
    loading.value = false
    return
  }

  loading.value = true
  error.value = null

  const { data, error: err } = await supabase
    .from('assets')
    .select('id, title')
    .ilike('title', `%${val}%`)
    .order('date', { ascending: false })
    .limit(10)

  if (err) {
    error.value = err.message
    results.value = []
  } else {
    results.value = data
  }

  loading.value = false
}

watch(searchTerm, (val) => {
  debounceSearch(val.trim())
})

const clearSearch = () => {
  searchTerm.value = ''
  results.value = []
  error.value = null
}
</script>

<template>
  <div class="relative w-full max-w-md" :class="$attrs.class">
 <!-- Minimal pill-style input -->
<div class="relative">
  <input
    v-model="searchTerm"
    type="search"
    placeholder="Search assets..."
    class="w-full px-6 py-4 pl-6 pr-10 text-sm bg-slate-50 rounded-full  focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-400 transition"
    autocomplete="on"
  />

  <!-- Clear button -->
  <button
    v-if="searchTerm"
    @click="clearSearch"
    type="button"
    class="absolute right-10 top-1/2 -translate-y-1/2 text-gray-50 hover:text-gray-50"
    aria-label="Clear"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>


    <!-- Dropdown -->
    <div
      v-if="loading || error || results.length || (searchTerm && !loading && !results.length)"
      class="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <ul class="text-sm text-gray-800">
        <li v-if="loading" class="px-4 py-3 text-gray-500">Searching...</li>
        <li v-if="error" class="px-4 py-3 text-red-600">{{ error }}</li>

        <li
          v-for="item in results"
          :key="item.id"
          class="hover:bg-gray-100 transition"
        >
          <NuxtLink
            :to="`/assets/${item.id}`"
            class="block px-4 py-3"
            @mousedown.prevent
          >
            {{ item.title }}
          </NuxtLink>
        </li>

        <li
          v-if="!results.length && searchTerm && !loading && !error"
          class="px-4 py-3 text-gray-500"
        >
          No results found.
        </li>
      </ul>
    </div>
  </div>
</template>

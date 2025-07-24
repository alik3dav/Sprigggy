<!-- components/StatsWidget.vue -->
<template>
    <div class="flex flex-wrap gap-4 text-xs text-gray-500 sm:text-sm">
      <div class="flex items-center gap-1">
        <span class="font-semibold text-gray-700">{{ stats.visitors }}</span> Visitors
      </div>
      <div class="flex items-center gap-1">
        <span class="font-semibold text-gray-700">{{ stats.downloads }}</span> Downloads
      </div>
      <div class="flex items-center gap-1">
        <span class="font-semibold text-gray-700">{{ stats.assets }}</span> Assets
      </div>
    </div>
  </template>
  
  <script setup>
  const stats = reactive({
    visitors: '12.3k',
    downloads: '8.7k',
    assets: '152'
  })
  
  // Later you can fetch from API like:
  // const { data } = await useFetch('/api/stats')
  // Object.assign(stats, data.value)
  </script>
  
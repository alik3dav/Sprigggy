<template>
  <div class="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden flex flex-col">
    <NuxtLink :to="link">
      <img :src="image" alt="" class="w-full object-cover" />
    </NuxtLink>

    <!-- flex-1 makes this container fill available height -->
    <div class="flex flex-col flex-1 p-4">
      <!-- Title -->
      <NuxtLink
        :to="link"
        class="block font-semibold text-gray-800 hover:text-blue-600 text-sm leading-tight line-clamp-2 mb-3"
      >
        {{ title }}
      </NuxtLink>

      <!-- Spacer pushes the below section to the bottom -->
      <div class="flex-grow"></div>

      <!-- Meta info always sticks to bottom -->
      <div class="space-y-2 mt-2">
        <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <span class="bg-gray-100 text-gray-700 text-[11px] px-4 py-1 rounded-full">
            {{ type }}
          </span>
        </div>

        <div class="flex flex-wrap gap-1">
          <span
            v-for="tag in tags"
            :key="tag"
            class="bg-blue-100 text-blue-700 text-[11px] px-4 py-0.2 rounded-full"
          >
            {{ tag }}
          </span>
        </div>

        <div class="flex text-xs text-gray-400">
          <span>Added: {{ formatDate(date) }}</span>
          <span class="ml-auto"
            >{{ downloads.toLocaleString() }} downloads</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  type: String,
  image: String,
  link: String,
  tags: Array,
  downloads: Number,
  date: String,
});

const formatDate = (input) => {
  const date = new Date(input);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
</script>

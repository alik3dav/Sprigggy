<template>
  
  <div>
    
    <!-- Image with overlay and open source badge -->
    <div class="relative rounded-lg overflow-hidden duration-300 aspect-[4/3]">



  <!-- Badge -->
  <div
    v-if="openSource"
    class="absolute top-1 right-4 z-20"
    title="Open Source"
  ><span class="text-[10px] font-medium text-green-300">
    Open Source
  </span>
    
  </div>



 <!-- Image -->
      <NuxtLink :to="link" class="block group h-full w-full">
        <img
          :src="image"
          alt=""
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <!-- Title overlay on hover -->
        <div
          class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-6"
        >
          <h3
            class="text-white font-medium text-base truncate mt-8"
            :title="title"
          >
            {{ title }}
          </h3>
        </div>
      </NuxtLink>
    </div>

    <!-- Metadata: type, tags, downloads -->
    <div class="flex items-center justify-between h-8 mt-2 px-1">
      <div class="flex gap-2 overflow-hidden whitespace-nowrap text-xs text-gray-700">
        <span class="bg-gray-100 rounded-full px-2 py-0.5">{{ type }}</span>

        <span
          v-for="tag in tags"
          :key="tag"
          class="bg-blue-100 text-blue-700 rounded-full px-2 py-0.5"
        >
          {{ tag }}
        </span>
      </div>

      <div class="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
        <Download class="w-4 h-4 text-gray-400" />
        <span>{{ downloads.toLocaleString() }} downloads</span>
      </div>
    </div>
  </div>
</template>





<script setup>
import { Download } from 'lucide-vue-next';



defineProps({
  title: String,
  type: String,
  image: String,
  link: String,
  tags: Array,
  downloads: Number,
  date: String,
  openSource: Boolean, // <-- new prop
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

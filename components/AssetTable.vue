<template>
  <div>
    <div v-if="!assets.length" class="text-gray-500 italic text-center py-10">
      No assets yet.
    </div>

    <table
      v-else
      class="w-full border-collapse rounded-lg border border-gray-300 shadow-sm overflow-hidden"
    >
      <thead class="bg-gray-50">
        <tr>
          <th class="border-b border-gray-300 p-3 text-left text-gray-700 font-semibold">Image</th>
          <th class="border-b border-gray-300 p-3 text-left text-gray-700 font-semibold">Title</th>
          <th class="border-b border-gray-300 p-3 text-left text-gray-700 font-semibold">Type</th>
          <th class="border-b border-gray-300 p-3 text-left text-gray-700 font-semibold">Tags</th>
          <th class="border-b border-gray-300 p-3 text-left text-gray-700 font-semibold">Downloads</th>
          <th class="border-b border-gray-300 p-3 text-left text-gray-700 font-semibold">Open Source</th>
          <th class="border-b border-gray-300 p-3 text-left text-gray-700 font-semibold">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="asset in assets"
          :key="asset.id"
          class="hover:bg-gray-50 transition-colors duration-150"
        >
          <!-- Image -->
          <td class="border-b border-gray-300 p-2 flex items-center space-x-3">
            <img
              v-if="asset.image"
              :src="asset.image"
              alt="Asset image"
              class="w-20 h-12 rounded-md border border-gray-300 object-cover shadow-sm transition-transform duration-200 hover:scale-110"
              loading="lazy"
            />
            <span
              class="truncate max-w-[120px] text-gray-600 text-sm select-text"
              v-else
            >
              No image
            </span>
          </td>

          <!-- Title -->
          <td class="border-b border-gray-300 p-3 text-gray-800 font-medium">
            {{ asset.title }}
          </td>

          <!-- Type -->
          <td class="border-b border-gray-300 p-3 text-gray-700 lowercase font-semibold">
            {{ asset.type }}
          </td>

          <!-- Tags -->
          <td class="border-b border-gray-300 p-3">
            <template v-if="asset.tags && asset.tags.length">
              <span
                v-for="tag in asset.tags"
                :key="tag"
                class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-1 px-2.5 py-0.5 rounded-full"
              >
                {{ tag }}
              </span>
            </template>
            <span v-else class="text-gray-400 italic text-xs">No tags</span>
          </td>

          <!-- Downloads -->
          <td class="border-b border-gray-300 p-3 text-center text-gray-700 font-mono">
            {{ asset.downloads || 0 }}
          </td>

          <!-- Open Source -->
          <td class="border-b border-gray-300 p-3 text-center">
            <span
              :class="{
                'bg-green-100 text-green-800': asset.open_source,
                'bg-gray-200 text-gray-500': !asset.open_source,
              }"
              class="inline-block px-3 py-1 text-xs rounded-full font-semibold select-none"
            >
              {{ asset.open_source ? 'Yes' : 'No' }}
            </span>
          </td>

          <!-- Actions -->
          <td class="border-b border-gray-300 p-3 space-x-4">
            <button
              @click="$emit('edit', asset)"
              class="text-blue-600 hover:underline font-semibold"
            >
              Edit
            </button>
            <button
              @click="$emit('delete', asset.id)"
              class="text-red-600 hover:underline font-semibold"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps(['assets'])
defineEmits(['edit', 'delete'])
</script>

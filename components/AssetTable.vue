<template>
  <div>
    <div v-if="!assets.length" class="text-gray-500">No assets yet.</div>
    <table
      v-else
      class="w-full table-auto border-collapse border border-gray-300"
    >
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 p-2 text-left">Title</th>
          <th class="border border-gray-300 p-2 text-left">Type</th>
          <th class="border border-gray-300 p-2 text-left">Tags</th>
          <th class="border border-gray-300 p-2 text-left">Downloads</th>
          <th class="border border-gray-300 p-2 text-left">OpenSource</th>
          <th class="border border-gray-300 p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="asset in assets" :key="asset.id" class="hover:bg-gray-50">
          <td class="border border-gray-300 p-2">{{ asset.title }}</td>
          <td class="border border-gray-300 p-2">{{ asset.type }}</td>
          <td class="border border-gray-300 p-2">
  {{ asset.tags ? asset.tags.join(', ') : '' }}
</td>
          <td class="border border-gray-300 p-2">{{ asset.downloads || 0 }}</td>
          <td class="border border-gray-300 p-2">{{ asset.open_source || 0 }}</td>
          <td class="border border-gray-300 p-2 space-x-2">
            <button
              @click="$emit('edit', asset)"
              class="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              @click="$emit('delete', asset.id)"
              class="text-red-600 hover:underline"
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
defineProps(['assets']);
defineEmits(['edit', 'delete']);
</script>

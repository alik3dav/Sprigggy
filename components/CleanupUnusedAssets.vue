<template>
  <button
    @click="cleanupUnusedAssets"
    :disabled="loading"
    class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
  >
    {{ loading ? 'Cleaning...' : 'Delete Unused Images' }}
  </button>
  <div v-if="status" class="mt-2 whitespace-pre-wrap font-mono text-sm">
    {{ status }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
const status = ref('')

async function cleanupUnusedAssets() {
  loading.value = true
  status.value = ''

  try {
    const res = await $fetch('/api/cleanup-unused-assets', { method: 'POST' })

    if (res.error) {
      status.value = '❌ Error: ' + res.error
    } else {
      status.value = `✅ Deleted ${res.deleted?.length || 0} unused files.`
    }
  } catch (err) {
    status.value = '💥 Unexpected error: ' + err.message
  } finally {
    loading.value = false
  }
}
</script>

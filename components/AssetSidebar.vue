<script setup>
import { ref, watch } from 'vue'
import { useSupabaseClient } from '#imports'

const supabase = useSupabaseClient()

const props = defineProps({
  currentAssetId: Number,
  tags: Array,
  type: String,
})

const relatedAssets = ref([])

async function fetchRelated() {
  if ((!props.tags || props.tags.length === 0) && !props.type) {
    relatedAssets.value = []
    return
  }

  let query = supabase
    .from('assets')
    .select('id, title, image, downloads')
    .neq('id', props.currentAssetId)
    .limit(5)

  if (props.tags && props.tags.length) {
    query = query.or(
      props.tags
        .map(tag => `tags.cs.{${tag}}`)
        .join(',')
    )
  } else if (props.type) {
    query = query.eq('type', props.type)
  }

  const { data, error } = await query
  if (error) {
    console.error('Error fetching related assets:', error)
  } else {
    relatedAssets.value = data
  }
}

watch(() => [props.tags, props.type], fetchRelated, { immediate: true })
</script>

<template>
  <section class="mt-6">
    <h2 class="text-lg font-semibold mb-3">Related Assets</h2>
    <div v-if="relatedAssets.length" class="space-y-3">
      <div
        v-for="item in relatedAssets"
        :key="item.id"
        class="flex items-center gap-3 hover:bg-gray-100 p-2 rounded cursor-pointer"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="w-12 h-12 object-cover rounded"
          loading="lazy"
        />
        <div>
          <NuxtLink
            :to="`/assets/${item.id}`"
            class="font-medium text-blue-600 hover:underline"
          >
            {{ item.title }}
          </NuxtLink>
          <div class="text-xs text-gray-500">
            {{ item.downloads?.toLocaleString() || 0 }} downloads
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-500 text-sm">No related assets found.</p>
  </section>
</template>

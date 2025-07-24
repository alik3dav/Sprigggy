<script setup>
import { ref, onMounted, computed } from 'vue';
import { marked } from 'marked';
import ProviderIcon from '~/components/ProviderIcon.vue';
import { useRoute } from 'vue-router';
import { useHead } from '#imports'

const supabase = useSupabaseClient();
const route = useRoute();
const asset = ref(null);

const formatDate = (input) => {
  if (!input) return '';
  const date = new Date(input);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Parse markdown description into HTML safely
const formattedDescription = computed(() => {
  if (!asset.value?.description) return '';
  return marked.parse(asset.value.description);
});

onMounted(async () => {
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('id', route.params.id)
    .single();

  if (error) console.error(error);
  else asset.value = data;
});

const handleDownload = async () => {
  if (!asset.value?.id || !asset.value?.download_url) return;

  try {
    const newDownloads = (asset.value.downloads || 0) + 1;
    const { error: updateError } = await supabase
      .from('assets')
      .update({ downloads: newDownloads })
      .eq('id', asset.value.id);

    if (updateError) throw updateError;

    const { data: updatedAsset, error: fetchError } = await supabase
      .from('assets')
      .select('*')
      .eq('id', asset.value.id)
      .single();

    if (fetchError) throw fetchError;

    asset.value = { ...updatedAsset };
    window.open(asset.value.download_url, '_blank');
  } catch (error) {
    console.error('Download error:', error);
  }
};


// Watch for asset to load, then set SEO tags
watch(asset, (val) => {
  if (!val) return

  useHead({
    title: `${val.title} | ZippyKit`,
    meta: [
      {
        name: 'description',
        content: val.description?.slice(0, 160) || 'Free design asset from ZippyKit.',
      },
      {
        property: 'og:title',
        content: `${val.title} | ZippyKit`,
      },
      {
        property: 'og:description',
        content: val.description?.slice(0, 160) || '',
      },
      {
        property: 'og:image',
        content: val.image || 'https://zippykit.com/default-og.jpg', // fallback
      },
      {
        property: 'og:url',
        content: `https://zippykit.com/asset/${val.id}`,
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: `https://zippykit.com/asset/${val.id}`,
      },
    ],
  })
})
</script>

<template>
  <div class="max-w-6xl mx-auto p-4 space-y-8">
    <div
      class="bg-white shadow-md rounded-lg p-8 grid grid-cols-1 lg:grid-cols-3 gap-10"
    >
      <!-- Left Column: Image + Description -->
      <div class="lg:col-span-2 space-y-6">
        <div v-if="asset?.image" class="rounded overflow-hidden">
          <img
            :src="asset.image"
            :alt="asset.title"
            class="w-full h-86 object-cover rounded"
            loading="lazy"
          />
        </div>

        <h1 class="text-4xl font-extrabold text-gray-900">
          {{ asset?.title }}
        </h1>

        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span
            v-if="asset?.type"
            class="inline-block bg-gray-100 rounded-full px-3 py-1 font-medium"
          >
            {{ asset.type }}
          </span>

          <template v-if="asset?.tags?.length">
            <span
              v-for="tag in asset.tags"
              :key="tag"
              class="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 font-semibold"
            >
              {{ tag }}
            </span>
          </template>
        </div>

        <!-- Render formatted markdown description -->
        <div
          class="prose max-w-none text-gray-700"
          v-html="formattedDescription"
        />
      </div>

      <!-- Right Sidebar: Download and Info -->
      <aside
        class="lg:col-span-1 sticky top-18 self-start space-y-6 border rounded p-4 shadow-sm bg-gray-50"
      >
        <div>
          <a
            v-if="asset?.download_url"
            :href="asset.download_url"
            target="_blank"
            class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow transition"
            rel="noopener noreferrer"
            @click.prevent="handleDownload"
          >
            <ProviderIcon :name="asset.provider" />
            Download Now
          </a>
        </div>

        <div class="text-sm text-gray-600 space-y-2">
          <p><strong>Added:</strong> {{ formatDate(asset?.date) }}</p>
          <p>
            <strong>Downloads:</strong>
            {{ asset?.downloads?.toLocaleString() || 0 }}
          </p>
        </div>
      </aside>
    </div>
  </div>
</template>

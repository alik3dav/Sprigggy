<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { marked } from 'marked';
import ProviderIcon from '~/components/ProviderIcon.vue';
import { useRoute } from 'vue-router';
import { useHead, useSupabaseClient } from '#imports'

const supabase = useSupabaseClient();
const route = useRoute();
const asset = ref(null);
const relatedAssets = ref([]);

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

  if (error) {
    console.error(error);
  } else {
    asset.value = data;
    fetchRelatedAssets();
  }
});

const fetchRelatedAssets = async () => {
  if (!asset.value) return;
  const tags = asset.value.tags || [];
  if (tags.length === 0) {
    relatedAssets.value = [];
    return;
  }

  // Build OR query for tags.cs.{tag}
  // Supabase doesn't allow simple 'in' for array contains so using 'or' with cs (contains)
  const orQuery = tags.map(tag => `tags.cs.{${tag}}`).join(',');

  const { data, error } = await supabase
    .from('assets')
    .select('id, title, image, downloads')
    .neq('id', asset.value.id)
    .or(orQuery)
    .limit(5);

  if (error) {
    console.error('Error fetching related assets:', error);
  } else {
    relatedAssets.value = data;
  }
};

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
  title: `${val.title} | Sprigggy`,
  meta: [
    {
      name: 'description',
      content: val.description?.slice(0, 160) || 'Free design asset from Sprigggy.',
    },
    {
      property: 'og:title',
      content: `${val.title} | Sprigggy`,
    },
    {
      property: 'og:description',
      content: val.description?.slice(0, 160) || 'Browse beautiful, free open-source design assets.',
    },
    {
      property: 'og:image',
      content: val.image || 'https://sprigggy.com/default-og.jpg', // change this to your real image
    },
    {
      property: 'og:url',
      content: `https://sprigggy.com/assets/${val.id}`,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://sprigggy.com/assets/${val.id}`,
    },
  ],
});

})
</script>

<template>
  <div class="max-w-6xl mt-24 mx-auto p-4 space-y-8">
    <div
      class="p-8 grid grid-cols-1 lg:grid-cols-3 gap-10"
    >
      <!-- Left Column: Image + Description -->
      <div class="lg:col-span-2 space-y-6">
        <div v-if="asset?.image" class="rounded-2xl overflow-hidden">
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

        <div class="flex items-center gap-2">
          <span
            v-if="asset?.type"
            class="bg-gray-100 rounded-full px-4 py-1"
          >
            {{ asset.type }}
          </span>

          <template v-if="asset?.tags?.length">
            <span
              v-for="tag in asset.tags"
              :key="tag"
              class="bg-blue-100 text-blue-700 rounded-full px-4 py-1"
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

      <!-- Right Sidebar: Download, Info & Related -->
      <aside
        class="lg:col-span-1 sticky top-18 self-start space-y-6  bg-slate-50  rounded-3xl p-8 "
      >
        <div>
          <a
            v-if="asset?.download_url"
            :href="asset.download_url"
            target="_blank"
            class="flex items-center justify-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold px-6 py-3 rounded-full shadow transition"
            rel="noopener noreferrer"
            @click.prevent="handleDownload"
          >
            <ProviderIcon :name="asset.provider" />
            Download Now
          </a>
        </div>
        <div v-if="openSource" class="absolute top-2 left-2 bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm z-10">
         Open Source
      </div>
        <div class="text-sm text-gray-600 space-y-2">
          <p><strong>Added:</strong> {{ formatDate(asset?.date) }}</p>
          <p>
            <strong>Downloads:</strong>
            {{ asset?.downloads?.toLocaleString() || 0 }}
          </p>
          <p v-if="asset?.open_source">
  <span class="text-green-500">Open Source</span>
</p>
        </div>

        <!-- Related Assets Section -->
        <section class="mt-6">
          <h2 class="text-lg font-semibold mb-3">Related Assets</h2>
          <div v-if="relatedAssets.length" class="space-y-3">
            <div
              v-for="item in relatedAssets"
              :key="item.id"
              class="flex items-center gap-3 hover:bg-slate-50 p-2 rounded cursor-pointer"
            >
              <img
                :src="item.image"
                alt="item.title"
                class="w-12 h-12 object-cover rounded"
                loading="lazy"
              />
              <div>
                <a
                  :href="`/assets/${item.id}`"
                  class="font-medium text-blue-600"
                >
                  {{ item.title }}
                </a>
                <div class="text-xs text-gray-500">
                  {{ item.downloads?.toLocaleString() || 0 }} downloads
                </div>
              </div>
            </div>
          </div>
          <p v-else class="text-gray-500 text-sm">No related assets found.</p>
        </section>
      </aside>
    </div>
  </div>
</template>

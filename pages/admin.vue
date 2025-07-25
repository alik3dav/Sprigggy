<template>
  <div class="max-w-6xl mx-auto mt-24 p-6 space-y-6">
    <h1 class="text-3xl font-bold mb-6">Admin: Manage Assets</h1>
    <CleanupUnusedAssets />
    <button
      @click="logout"
      class="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>

    <!-- Success & Error Messages -->
    <div v-if="success" class="text-green-600 font-medium">{{ success }}</div>
    <div v-if="error" class="text-red-600 font-medium">{{ error }}</div>

    <AssetTable :assets="assets" @edit="startEdit" @delete="deleteAsset" />

    <hr class="my-6" />

    <AssetForm
      v-model="form"
      :isEditing="isEditing"
      :loading="loadingSubmit"
      @submit="handleSubmit"
      @cancel="cancelEdit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CleanupUnusedAssets from '~/components/CleanupUnusedAssets.vue'
import AssetTable from '~/components/AssetTable.vue';
import AssetForm from '~/components/AssetForm.vue';

const supabase = useSupabaseClient();
const router = useRouter();

const assets = ref([]);
const form = ref({
  title: '',
  type: '',
  tags: '',           // <-- string for the input
  description: '',
  provider: '',
  download_url: '',
  image: '',
});

const loadingSubmit = ref(false);
const success = ref('');
const error = ref('');
const isEditing = ref(false);
const editId = ref(null);

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return router.push('/login');
  await fetchAssets();
});

async function fetchAssets() {
  const { data, error: err } = await supabase
    .from('assets')
    .select('*')
    .order('date', { ascending: false });

  if (err) {
    error.value = 'Failed to fetch assets';
    console.error(err);
  } else {
    assets.value = data;
  }
}

function startEdit(asset) {
  isEditing.value = true;
  editId.value = asset.id;
  form.value = {
    ...asset,
    tags: Array.isArray(asset.tags) ? asset.tags.join(', ') : asset.tags || '',
  };
}


function cancelEdit() {
  isEditing.value = false;
  editId.value = null;
  resetForm();
  error.value = '';
  success.value = '';
}

function resetForm() {
  form.value = {
    title: '',
    type: '',
    tags: '',           // <-- reset as string
    description: '',
    provider: '',
    download_url: '',
    image: '',
  };
}

async function handleSubmit(submittedForm) {
  // Defensive conversion, even if tags already an array
  const tagsArray = Array.isArray(submittedForm.tags)
    ? submittedForm.tags.filter(Boolean)
    : typeof submittedForm.tags === 'string' && submittedForm.tags.trim() !== ''
      ? submittedForm.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];

  const assetData = {
    ...submittedForm,
    tags: tagsArray,
    date: new Date().toISOString(),
  };

  console.log('Sending to Supabase:', assetData);

  if (isEditing.value) {
    const { error } = await supabase
      .from('assets')
      .update(assetData)
      .eq('id', editId.value);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('assets')
      .insert([assetData]);
    if (error) throw error;
  }
}


async function deleteAsset(id) {
  if (!confirm('Are you sure you want to delete this asset?')) return;

  const { error: deleteError } = await supabase
    .from('assets')
    .delete()
    .eq('id', id);

  if (deleteError) {
    error.value = 'Failed to delete asset';
    console.error(deleteError);
    return;
  }

  success.value = 'Asset deleted';
  await fetchAssets();
}

async function logout() {
  await supabase.auth.signOut();
  router.push('/login');
}
</script>

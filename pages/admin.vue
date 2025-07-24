<template>
  <div class="max-w-6xl mx-auto p-6 space-y-6">
    <h1 class="text-3xl font-bold mb-6">Admin: Manage Assets</h1>

    <button
      @click="logout"
      class="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>

    <AssetTable :assets="assets" @edit="startEdit" @delete="deleteAsset" />

    <hr class="my-6" />

    <AssetForm
      v-model="form"
      :isEditing="isEditing"
      @submit="handleSubmit"
      @cancel="cancelEdit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSupabaseClient } from '@supabase/auth-helpers-vue';

import AssetTable from '~/components/AssetTable.vue';
import AssetForm from '~/components/AssetForm.vue';

const supabase = useSupabaseClient();
const router = useRouter();

const assets = ref([]);
const form = ref({
  title: '',
  type: '',
  tags: '',
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
  const {
    data: { user },
  } = await supabase.auth.getUser();
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
  form.value = { ...asset };
  error.value = '';
  success.value = '';
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
    download_url: '',
    provider: '',
    description: '',
  };
}

async function handleSubmit(submittedForm) {
  error.value = '';
  success.value = '';
  loadingSubmit.value = true;

  try {
    const assetData = {
      ...submittedForm,
      date: new Date().toISOString(),
    };

    if (isEditing.value) {
      const { error: updateError } = await supabase
        .from('assets')
        .update(assetData)
        .eq('id', editId.value);
      if (updateError) throw updateError;
      success.value = 'Asset updated successfully';
    } else {
      const { error: insertError } = await supabase
        .from('assets')
        .insert([assetData]);
      if (insertError) throw insertError;
      success.value = 'Asset added successfully';
    }

    await fetchAssets();
    cancelEdit();
  } catch (err) {
    error.value = 'Save failed: ' + err.message;
    console.error('Failed to save asset:', err);
  } finally {
    loadingSubmit.value = false;
  }
}


  try {
    if (isEditing.value) {
      const { error: updateError } = await supabase
        .from('assets')
        .update(assetData)
        .eq('id', editId.value);
      if (updateError) throw updateError;
      success.value = 'Asset updated successfully';
    } else {
      const { error: insertError } = await supabase
        .from('assets')
        .insert([assetData]);
      if (insertError) throw insertError;
      success.value = 'Asset added successfully';
    }

    await fetchAssets();
    resetForm();
    isEditing.value = false;
    editId.value = null;
  } catch (err) {
    error.value = 'Save failed: ' + err.message;
    console.error('Failed to save asset:', err);
  } finally {
    loadingSubmit.value = false;
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

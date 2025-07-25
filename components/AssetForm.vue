<template>
  <form @submit.prevent="onSubmit" class="max-w-xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow-md">
    <!-- Title -->
    <div>
      <label class="block text-gray-700 font-semibold mb-2" for="title">Title</label>
      <input
        id="title"
        v-model="localForm.title"
        type="text"
        required
        placeholder="Asset title"
        class="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Type -->
    <div>
      <label class="block text-gray-700 font-semibold mb-2" for="type">Type</label>
      <input
        id="type"
        v-model="localForm.type"
        type="text"
        required
        placeholder="e.g. plugin, template"
        class="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Tags -->
    <div>
      <label class="block text-gray-700 font-semibold mb-2" for="tags">Tags (comma separated)</label>
      <input
        id="tags"
        v-model="localForm.tags"
        type="text"
        placeholder="e.g. marketing, ui, free"
        class="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Description -->
    <div>
      <label class="block text-gray-700 font-semibold mb-2" for="description">Description (Markdown)</label>
      <ClientOnly>
        <ToastEditor v-model="localForm.description" />
      </ClientOnly>
    </div>

    <!-- Open Source Toggle -->
    <div class="flex items-center space-x-3">
      <input
        id="openSource"
        type="checkbox"
        v-model="localForm.open_source"
        class="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
      />
      <label for="openSource" class="text-gray-700 font-medium select-none">Open Source</label>
    </div>

    <!-- Provider -->
    <div>
      <label class="block text-gray-700 font-semibold mb-2" for="provider">Provider</label>
      <select
        id="provider"
        v-model="localForm.provider"
        required
        class="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option disabled value="">Select Provider</option>
        <option value="google_drive">Google Drive</option>
        <option value="dropbox">Dropbox</option>
        <option value="mega">Mega</option>
        <option value="workupload">Workupload</option>
        <option value="other">Other</option>
      </select>
    </div>

    <!-- Download URL -->
    <div>
      <label class="block text-gray-700 font-semibold mb-2" for="download_url">Download URL</label>
      <input
        id="download_url"
        v-model="localForm.download_url"
        type="url"
        required
        placeholder="https://example.com/download"
        class="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Image Upload -->
    <div>
      <label class="block text-gray-700 font-semibold mb-2" for="imageUpload">Image Upload (590x300px)</label>
      <input
        id="imageUpload"
        type="file"
        @change="handleFileChange"
        accept="image/*"
        class="block w-full text-gray-700"
      />
      <div v-if="uploading" class="text-gray-600 mt-2 italic">Uploading image...</div>
      <img
        v-if="localForm.image"
        :src="localForm.image"
        alt="Preview"
        class="mt-3 max-w-full rounded-lg shadow-sm border border-gray-200"
      />
    </div>

    <!-- Buttons -->
    <div class="flex space-x-4 pt-4">
      <button
        type="submit"
        class="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-3 transition"
      >
        {{ isEditing ? 'Save Changes' : 'Add Asset' }}
      </button>
      <button
        v-if="isEditing"
        type="button"
        @click="$emit('cancel')"
        class="flex-grow bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md py-3 transition"
      >
        Cancel
      </button>
    </div>
  </form>
</template>


<script setup>
import { ref, watch } from 'vue'
import ToastEditor from '~/components/ToastEditor.vue'

const supabase = useSupabaseClient()

const props = defineProps({
  modelValue: Object,
  isEditing: Boolean,
})

const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])

const localForm = ref({ open_source: false, ...props.modelValue })
const uploading = ref(false)

watch(
  () => props.modelValue,
  (newVal) => {
    localForm.value = {
      ...newVal,
      tags: Array.isArray(newVal.tags) ? newVal.tags.join(', ') : newVal.tags || ''
    }
  }
)

async function handleFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  uploading.value = true
  const fileName = `${Date.now()}_${file.name}`
  const filePath = `assets/${fileName}`

  const { error } = await supabase.storage.from('assets').upload(filePath, file)
  if (error) {
    console.error('Image upload failed', error)
  } else {
    const { data } = supabase.storage.from('assets').getPublicUrl(filePath)
    localForm.value.image = data.publicUrl
    emit('update:modelValue', localForm.value)
  }
  uploading.value = false
}

function onSubmit() {
  emit('submit', { ...localForm.value })  // localForm.value.tags is a string here
}

</script>

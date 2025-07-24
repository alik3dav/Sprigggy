<template>
  <form @submit.prevent="onSubmit" class="space-y-4 max-w-xl">
    <!-- Title -->
    <div>
      <label class="block font-medium mb-1">Title</label>
      <input
        v-model="localForm.title"
        type="text"
        required
        class="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="Asset title"
      />
    </div>

    <!-- Type -->
    <div>
      <label class="block font-medium mb-1">Type</label>
      <input
        v-model="localForm.type"
        type="text"
        required
        class="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="e.g. plugin, template"
      />
    </div>

    <!-- Tags -->
    <div>
      <label class="block font-medium mb-1">Tags (comma separated)</label>
      <input
        v-model="localForm.tags"
        type="text"
        class="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="e.g. marketing, ui, free"
      />
    </div>

    <!-- Description -->
    <div>
      <label class="block font-medium mb-1">Description (Markdown supported)</label>
      <textarea
        v-model="localForm.description"
        rows="5"
        class="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="Write description here"
      ></textarea>

      <!-- Markdown preview -->
      <div
        class="mt-3 p-4 border border-gray-200 rounded prose max-w-none bg-gray-50"
        v-html="markdownPreview"
      ></div>
    </div>

    <!-- Provider -->
    <div>
      <label class="block font-medium mb-1">Provider</label>
      <select
        v-model="localForm.provider"
        class="w-full border border-gray-300 rounded px-3 py-2"
        required
      >
        <option value="" disabled>Select Provider</option>
        <option value="google_drive">Google Drive</option>
        <option value="dropbox">Dropbox</option>
        <option value="mega">Mega</option>
        <option value="other">Other</option>
      </select>
    </div>

    <!-- Download URL -->
    <div>
      <label class="block font-medium mb-1">Download URL</label>
      <input
        v-model="localForm.download_url"
        type="url"
        required
        class="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="https://example.com/download"
      />
    </div>

    <!-- Image Upload -->
    <div>
      <label class="block font-medium mb-1">Image Upload (590x300px)</label>
      <input type="file" @change="handleFileChange" accept="image/*" />
      <div v-if="uploading" class="text-gray-600 mt-1">Uploading image...</div>
      <img
        v-if="localForm.image"
        :src="localForm.image"
        alt="Preview"
        class="mt-3 max-w-full rounded"
      />
    </div>

    <!-- Buttons -->
    <div class="flex space-x-4">
      <button
        type="submit"
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        {{ isEditing ? 'Save Changes' : 'Add Asset' }}
      </button>
      <button
        v-if="isEditing"
        type="button"
        @click="$emit('cancel')"
        class="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400 transition"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { marked } from 'marked'

const supabase = useSupabaseClient()

const props = defineProps({
  modelValue: Object,
  isEditing: Boolean,
})

const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])

const localForm = ref({ ...props.modelValue })
const uploading = ref(false)

watch(
  () => props.modelValue,
  (newVal) => {
    localForm.value = { ...newVal }
  }
)

// Computed markdown preview from localForm.description
const markdownPreview = computed(() => {
  return localForm.value.description ? marked.parse(localForm.value.description) : ''
})

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
  emit('submit', { ...localForm.value })
}
</script>

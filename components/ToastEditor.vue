<script setup>
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/editor'
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const editorRef = ref(null)
let instance = null

onMounted(() => {
  if (process.client) {
    instance = new Editor({
      el: editorRef.value,
      height: '400px',
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      initialValue: props.modelValue || '',
      usageStatistics: false,
      placeholder: 'Write your description...',
      hooks: {
        change: () => {
          emit('update:modelValue', instance.getMarkdown())
        },
      },
      // 👇 This helps treat single line breaks as <br>
      customHTMLRenderer: {
        text: (node) => {
          return node.literal.replace(/\n/g, '<br />')
        },
      },
    })
  }
})

watch(() => props.modelValue, (newVal) => {
  if (instance && instance.getMarkdown() !== newVal) {
    instance.setMarkdown(newVal || '')
  }
})

onBeforeUnmount(() => {
  if (instance) instance.destroy()
})
</script>

<template>
  <div ref="editorRef" />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: String,
});

const iconSrc = computed(() => {
  switch (props.name) {
    case 'google_drive':
      return '/icons/google-drive.png';
    case 'dropbox':
      return '/icons/dropbox.png';
    case 'mega':
      return '/icons/mega.png';
    default:
      return '/icons/download.png'; // fallback icon
  }
});
</script>

<template>
  <img :src="iconSrc" alt="" class="w-5 h-5 object-contain" />
</template>

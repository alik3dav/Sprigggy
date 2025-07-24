<script setup>
import { useRouter } from 'vue-router';
import { useSupabaseClient } from '#imports';

const supabase = useSupabaseClient();
const router = useRouter();

const logout = async () => {
  await supabase.auth.signOut();
  router.push('/login');
};
</script>

<template>
  <button
    @click="logout"
    class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    Log Out
  </button>
</template>

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
    class="bg-orange-900 text-white px-4 py-2 rounded-full hover:bg-orange-800"
  >
    Log Out
  </button>
</template>

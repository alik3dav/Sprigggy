<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useSupabaseClient, useSupabaseUser } from '#imports';

const supabase = useSupabaseClient();
const router = useRouter();
const user = useSupabaseUser();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

// Redirect if already logged in
watch(
  user,
  (u) => {
    if (u) router.push('/admin');
  },
  { immediate: true } // so it runs on initial load
);

const login = async () => {
  error.value = '';
  loading.value = true;
  try {
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (loginError) {
      error.value = loginError.message;
      loading.value = false;
      return;
    }

    // Wait a tiny bit for user state to update then redirect
    // Optional: you can do a check here or rely on the watcher
    router.push('/admin');
  } catch (err) {
    error.value = 'Unexpected error occurred';
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="max-w-md mx-auto p-8 mt-24 bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-extrabold mb-8 text-center text-sky-900">
      Login to Sprigggy
    </h1>

    <input
      v-model="email"
      type="email"
      placeholder="Email"
      class="w-full mb-5 px-5 py-3 bg-slate-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 transition"
      :disabled="loading"
      autocomplete="username"
    />

    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="w-full mb-6 px-5 py-3 bg-slate-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 transition"
      :disabled="loading"
      autocomplete="current-password"
    />

    <button
      @click="login"
      :disabled="loading"
      class="w-full bg-sky-700 text-white py-3 rounded-lg hover:bg-sky-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
    >
      <span v-if="loading">Logging in...</span>
      <span v-else>Log In</span>
    </button>

    <p v-if="error" class="mt-4 text-center text-red-600 font-medium">
      {{ error }}
    </p>
  </div>
</template>


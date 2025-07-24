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

// Redirect if already logged in
watch(user, (u) => {
  if (u) router.push('/admin');
});

const login = async () => {
  error.value = '';
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (loginError) error.value = loginError.message;
  else router.push('/admin');
};
</script>

<template>
  <div class="max-w-md mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <input
      v-model="email"
      type="email"
      placeholder="Email"
      class="w-full mb-3 p-2 border rounded"
    />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="w-full mb-3 p-2 border rounded"
    />
    <button
      @click="login"
      class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    >
      Log In
    </button>
    <p v-if="error" class="mt-2 text-red-600">{{ error }}</p>
  </div>
</template>

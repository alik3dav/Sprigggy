// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase', '@nuxtjs/robots','@nuxtjs/sitemap'],
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
    redirect: false,
  },
  robots: {
    UserAgent: '*',
    Disallow: '',
  },
  sitemap: {
    siteUrl: 'https://zippykit.com',
    trailingSlash: false,
    routes: async () => {
      // Dynamically generate asset URLs from Supabase
      const client = useSupabaseClient()
      const { data } = await client.from('assets').select('id')
      return data.map((asset) => `/assets/${asset.id}`)
    },
  },
  // No 'plugins' array here for Tailwind plugins!
});

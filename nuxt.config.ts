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
    siteUrl: 'https://sprigggy.com', // or your actual domain
    trailingSlash: false,
    routes: async () => {
      const client = useSupabaseClient();
      const { data } = await client.from('assets').select('id');
      return data ? data.map((asset) => `/assets/${asset.id}`) : [];
    },
  },
  // No 'plugins' array here for Tailwind plugins!

  app: {
    head: {
      titleTemplate: '%s | Sprigggy',
      meta: [
        { name: 'description', content: 'Sprigggy: Free, high-quality design assets for creatives.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Sprigggy' },
        { property: 'og:url', content: 'https://sprigggy.com' },
        // Add more defaults or canonical here if needed
      ],
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@600;700&display=swap',
        },
      ],
    },
  },
  
  
});

export default defineNuxtConfig({
  runtimeConfig: {
    supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/image',
  ],

  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
    redirect: false,
  },

  robots: {
    useragent: '*',
    allow: '/',
    disallow: ['/admin', '/api'],
    sitemap: 'https://sprigggy.com/sitemap.xml',
  },

  sitemap: {
    siteUrl: 'https://sprigggy.com',
    trailingSlash: false,
    routes: async () => {
      const client = useSupabaseClient(); // This won't work directly here
      const { $supabase } = useNuxtApp(); // And this also won't work in config

      // ⚠️ Instead: Move this to a runtime route generator, or use static/manual list if needed
      return [];
    },
  },
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
      ],
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Montserrat:wght@400;700;800&display=swap',
        },
      ],
    },
  },
  
});

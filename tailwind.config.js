/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './nuxt.config.{js,ts}',
  ],
  // tailwind.config.js
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'], // changed here
      },
      fontSize: {
        h1: ['2.25rem', { lineHeight: '2.75rem' }], // 36px
        h2: ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        base: ['1rem', { lineHeight: '1.75rem' }], // 16px
      },
      colors: {
        sprigggy: {
          greenLight: '#34D399',
          greenBase: '#10B981',
          greenDark: '#059669',
          neutralDark: '#111827',
          neutralMedium: '#6B7280',
          neutralLight: '#F9FAFB',
          accentYellow: '#FBBF24',
        },
      },
    },
  },

  plugins: [require('@tailwindcss/typography')],
};

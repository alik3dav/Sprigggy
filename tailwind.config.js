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
      heading: ['Poppins', 'sans-serif'],
    },
    fontSize: {
      h1: ['2.25rem', { lineHeight: '2.75rem' }], // 36px
      h2: ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      base: ['1rem', { lineHeight: '1.75rem' }], // 16px
    },
  },
},

  plugins: [require('@tailwindcss/typography')],
};

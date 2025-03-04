/** @type {import('tailwindcss').Config} */
export default {
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-primeui')],
}

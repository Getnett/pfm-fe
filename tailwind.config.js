/** @type {import('tailwindcss').Config} */
import primeVuePlugin from 'tailwindcss-primeui'
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
  plugins: [primeVuePlugin],
}

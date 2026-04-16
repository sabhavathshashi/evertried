/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#eff6ff',
          DEFAULT: '#3b82f6',
          dark: '#1e3a8a',
        }
      }
    },
  },
  plugins: [],
}

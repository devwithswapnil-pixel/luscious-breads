/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5EFE0', // cream
        foreground: '#2C1A0E', // espresso
        primary: {
          DEFAULT: '#D4A843', // amber
          dark: '#B08832'
        },
        secondary: '#E9EDC9',
        accent: '#FAEDCD'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}

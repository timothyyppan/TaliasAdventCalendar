/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'christmas-red': {
          900: '#7f1d1d',
          800: '#991b1b',
          700: '#b91c1c',
        },
        'christmas-green': {
          900: '#14532d',
          800: '#166534',
          700: '#15803d',
        }
      },
      fontFamily: {
        'handwriting': ['"Dancing Script"', 'cursive'],
      },
      animation: {
        'bounce': 'bounce 1s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
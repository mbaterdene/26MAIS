/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cardinal-red': '#8C1515',
        'digital-red': '#B1040E',
        'digital-blue': '#006CB8',
        'black': '#2E2D29',
        'white': '#FFFFFF',
        'sand': '#D2C295',
      },
      fontFamily: {
        sans: ['Sansa', '"Source Sans 3"', '"Source Sans Pro"', 'sans-serif'],
        serif: ['"Source Serif 4"', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}

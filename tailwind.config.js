/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      screens: {
        xs: '320px', // Extra small devices (phones)
        sm: '640px', // Small devices (tablets)
        md: '768px', // Medium devices (laptops)
        lg: '1024px', // Large devices (desktops)
        xl: '1280px', // Extra large devices (large desktops)
        '2xl': '1536px', // 2x large devices
        '3xl': '1920px', // 3x large devices
        '4xl': '2560px', // 4x large devices
        '5xl': '3840px', // 5x large devices (4K and beyond)
      },
      fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.animate-fadeIn': {
          animation: 'fadeIn 1s ease-in-out',
        },
      }
      addUtilities(newUtilities, ['responsive'])
    }),
  ],
}

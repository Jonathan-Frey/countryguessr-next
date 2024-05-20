import { type Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
      },
      colors: {
        primary: '#FEFAF6',
        secondary: '#EADBC8',
        tertiary: '#DAC0A3',
        text: '#202020',
        alert: '#DC143C',
        highlight: '#102C57',
      },
      animation: {
        grow: 'grow 2s forwards',
      },
      keyframes: {
        grow: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config

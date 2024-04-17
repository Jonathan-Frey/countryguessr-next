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
    },
  },
  plugins: [],
} satisfies Config

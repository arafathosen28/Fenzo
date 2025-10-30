import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#CBA135',
          soft: '#E3B23C'
        }
      },
      boxShadow: {
        glass: '0 8px 30px rgba(0,0,0,0.25)'
      },
      borderRadius: {
        '2xl': '1rem'
      }
    }
  },
  plugins: []
}
export default config

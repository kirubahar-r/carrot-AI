/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        spidey: {
          red: '#E23636',
          crimson: '#DC2626',
          blood: '#991B1B',
          electric: '#FF1E44',
          blue: '#2563EB',
          cobalt: '#1D4ED8',
          deepblue: '#0D1B2A',
          navy: '#0A1128',
          dark: '#070913',
          card: '#0B0E1B',
          web: '#00F0FF',
          gold: '#F59E0B'
        },
        brand: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          800: '#151b2e',
          850: '#0e1322',
          900: '#090d18',
          950: '#05070e',
        }
      },
      fontFamily: {
        sans: ['Rajdhani', 'Inter', 'system-ui', 'sans-serif'],
        spidey: ['Oxanium', 'system-ui', 'sans-serif'],
        comic: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        tech: ['Rajdhani', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}

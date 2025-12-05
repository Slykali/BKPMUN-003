/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#0d1117',
        },
        premium: {
          black: '#000000',
          dark: '#0a0a0a',
          darker: '#050505',
          gray: '#1a1a1a',
          light: '#2a2a2a',
          white: '#ffffff',
          offwhite: '#f5f5f5',
          silver: '#c0c0c0',
        },
        primary: '#ffffff',
        secondary: '#000000',
        accent: '#ffffff',
        dark: '#0a0a0a',
        darker: '#000000',
        light: '#1a1a1a',
        warm: '#ffffff',
        premium: '#ffffff',
        'dark-red': '#8B0000',
        'dark-red-light': '#A52A2A',
        'dark-yellow': '#B8860B',
        'dark-yellow-light': '#DAA520',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


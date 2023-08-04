/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        4.5: '18px',
        66: '264px'
      },
      height: {
        4.5: '18px',
        66: '264px'
      },
      padding: {
        4.5: '18px'
      },
      zIndex: {
        full: '9999'
      }
    }
  },
  plugins: []
}

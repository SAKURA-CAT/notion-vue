/** @type {import('tailwindcss').Config} */

const length = {
  0.25: '1px',
  4.5: '18px',
  7.5: '30px',
  66: '264px'
}

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      margin: {
        ...length
      },
      width: {
        ...length
      },
      height: {
        ...length
      },
      minHeight: {
        ...length
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

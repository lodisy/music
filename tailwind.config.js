/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './src/*.tsx'],
  theme: {
    extend: {
      translate: {
        'translate-x-1/3': 'translateX(33%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

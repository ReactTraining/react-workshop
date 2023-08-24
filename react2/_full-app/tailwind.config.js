/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  // We go up a directory from _full-app to capture all the lessons
  content: ['./index.html', '../**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Text
        textColor: colors.slate['500'],
        anchorColor: colors.cyan['400'],
        headingColor: colors.slate['700'],
        // Brand
        brandColor: colors.sky['600'],
      },
    },
  },
  plugins: [],
}

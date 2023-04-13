/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Text
        textColor: colors.slate['500'],
        anchorColor: colors.cyan['400'],
        headingColor: colors.slate['600'],
        // Misc
        lineColor: colors.slate['300'],
      },
    },
  },
  plugins: [],
}

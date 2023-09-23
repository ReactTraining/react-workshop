/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
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
        brandBlue: colors.blue['400'],
        brandBlueLight: colors.blue['200'],
        brandPink: colors.purple['300'],
      },
    },
  },
  plugins: [],
}

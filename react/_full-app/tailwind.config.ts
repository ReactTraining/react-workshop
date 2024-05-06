/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors'

export const config = {
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
        brandBlueLight: colors.blue['200'],
        brandBlue: colors.blue['400'],
        brandBlueDark: colors.blue['500'],
        brandPinkLight: colors.purple['100'],
        brandPink: colors.purple['300'],
      },
    },
  },
  plugins: [],
}

export default config

import type { Config } from 'tailwindcss'

import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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

import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'

export function getTailwindTheme() {
  const theme = resolveConfig(tailwindConfig).theme
  return theme
}

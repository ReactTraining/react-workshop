import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'

export function getTailwindTheme() {
  // Even though docs said resolveConfig should get the fully resolved custom config,
  // I found that it wasn't including my extended colors, so we'll do that ourselves
  const theme = { ...resolveConfig(tailwindConfig).theme, ...tailwindConfig.theme }
  return theme
}

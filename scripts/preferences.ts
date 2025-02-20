import path from 'path'
import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const preferencesPath = path.resolve(__dirname, '..', 'preferences.json')

// export function resetCoursePreferences() {
//   const preferences = loadPreferences()
//   const resetPreferences = {
//     compiledReact: preferences.compiledReact,
//     framework: preferences.framework,
//   }
//   fs.writeFileSync(preferencesPath, JSON.stringify(resetPreferences, null, 2))
//   return resetPreferences
// }

export function loadPreferences() {
  try {
    if (!fs.existsSync(preferencesPath)) {
      return {}
    }
    const data = fs.readFileSync(preferencesPath, 'utf8')
    const preferences = JSON.parse(data || '{}')
    return preferences
  } catch (err) {
    console.error(err)
  }
}

export function savePreferences(updates: Record<string, any>) {
  const preferences = loadPreferences()
  try {
    fs.writeFileSync(preferencesPath, JSON.stringify({ ...preferences, ...updates }, null, 2))
  } catch (err) {
    // no-op
  }
}

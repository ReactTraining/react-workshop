import { useState } from 'react'

// Some help with the matchMedia API:
// `const media = window.matchMedia(query)`
// `media` object has a `.matches` property (returns boolean)
// The `query` is a string, resembling a CSS media-query rule
// You can do `media.addEventListener('change', fn)`, or
// `media.removeEventListener('change', fn)` to listen to changes

function useMedia(query) {
  const [matches, setMatches] = useState(true)

  return matches
}

export default useMedia

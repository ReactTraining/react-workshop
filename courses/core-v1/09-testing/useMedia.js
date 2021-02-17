import { useState, useEffect } from 'react'

function useMedia(query) {
  const [matches, setMatches] = useState(() => {
    return window && window.matchMedia(query).matches
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = (e) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

export default useMedia

import { useLayoutEffect, useState } from 'react'

function useMedia(query) {
  const [matches, setMatches] = useState(() => {
    return window.matchMedia(query).matches
  })

  useLayoutEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => {
      setMatches(media.matches)
    }
    media.addEventListener('change', listener)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

export default useMedia

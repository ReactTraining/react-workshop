## Teach useLayoutEffect

We usually start with useEffect and go through some hurdles with it (how the state will be initialized) and end up with this solution:

```tsx
type Props = { width?: number }

export const AppSidebar: React.FC<Props> = ({ width = 1200 }) => {
  const query = `(min-width: ${width}px)`
  const [isWide, setIsWide] = useState(false)

  useLayoutEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => setIsWide(media.matches)
    setIsWide(media.matches)
    media.addEventListener('change', listener)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return isWide ? (
    <aside className="card w-130">
      <RecentLessons />
    </aside>
  ) : null
}
```

## Refactor to custom hook

```ts
import { useState, useLayoutEffect } from 'react'

export function useMedia(query: string) {
  const [matches, setMatches] = useState(false)

  useLayoutEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => setMatches(media.matches)
    setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}
```

## AppSidebar with children

Right now the AppSidebar isn't as composable as it could be. It hard-codes the RecentLessons as the only thing it can have. Let's let the owner pass in children instead

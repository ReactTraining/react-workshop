import { useEffect, useState } from 'react'

// Usage:
// const [myState, setMyState] = useState(false)
// const setMyStateDelayed = useDelayedCallback<boolean>((newState) => setMyState(newState))
// Calling setMyStateDelayed(true, 3000) will wait 3000ms before it actually changes
// the myState to true

export function useDelayedCallback<S>(cb: (s: S) => void) {
  const [state, setState] = useState<S | null>(null)
  const [ms, setMs] = useState(0)

  function queueState(state: S, ms: number) {
    setState(state)
    setMs(ms)
  }

  useEffect(() => {
    if (state !== null) {
      let isCurrent = true
      const id = setTimeout(() => {
        if (isCurrent) {
          cb(state)
          setState(null)
        }
      }, ms)
      return () => {
        isCurrent = false
        clearTimeout(id)
      }
    }
  }, [state, cb, ms])

  return queueState
}

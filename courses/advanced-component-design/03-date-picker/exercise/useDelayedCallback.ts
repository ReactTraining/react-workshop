import { useState, useEffect } from 'react'

export function useDelayedCallback<T>(cb: (v: T) => void) {
  const [callbackValue, setCallbackValue] = useState<T | null>(null)
  const [ms, setMs] = useState(0)

  function queueState(callbackValue: T, ms: number) {
    setCallbackValue(callbackValue)
    setMs(ms)
  }

  useEffect(() => {
    if (callbackValue !== null) {
      const id = setTimeout(() => cb(callbackValue), ms)
      return () => clearTimeout(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callbackValue, ms])

  return queueState
}

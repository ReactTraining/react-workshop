import { useState, useEffect } from 'react'

export default function useApi(api) {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCurrent = true
    setLoading(true)
    api()
      .then(response => {
        if (!isCurrent) return
        setResponse(response)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
    return () => (isCurrent = false)
  }, [api])

  return [response, loading, error]
}

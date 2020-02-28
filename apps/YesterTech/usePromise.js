import { useReducer, useEffect } from 'react'

export default function usePromise(promise) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'LOADING':
          return { ...state, loading: true }
        case 'RESOLVED':
          return { ...state, loading: false, response: action.response, error: null }
        case 'ERROR':
          return { ...state, loading: false, response: null, error: action.error }
        default:
          return state
      }
    },
    {
      loading: false,
      response: null,
      error: null
    }
  )

  useEffect(() => {
    let isCurrent = true
    dispatch({ type: 'LOADING' })
    promise()
      .then(response => {
        if (!isCurrent) return
        dispatch({ type: 'RESOLVED', response })
      })
      .catch(error => {
        dispatch({ type: 'ERROR', error })
      })
    return () => (isCurrent = false)
  }, [promise])

  return [state.response, state.loading, state.error]
}

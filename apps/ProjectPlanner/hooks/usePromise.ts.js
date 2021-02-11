// import { useReducer, useEffect } from 'react'

// type State = {
//   status: 'idle' | 'loading' | 'success' | 'error'
//   response: any
//   error: any
// }

// type Event =
//   | { type: 'FETCH'; payload?: {} }
//   | { type: 'RESOLVE'; payload: { response: any } }
//   | { type: 'REJECT'; payload: { error: any } }

// const machine = {
//   idle: {
//     FETCH: 'loading',
//   },
//   loading: {
//     RESOLVE: 'success',
//     REJECT: 'error',
//   },
//   success: null,
//   error: null,
// }

// export function usePromise(promise: any) {
//   const [state, dispatch] = useReducer(
//     (state: State, event: Event) => {
//       // if (event.type === null) return state
//       // const status = 'loading' // machine[state.status]
//       return {
//         status: 'idle',
//         response: null,
//         error: null,
//         // ...event.payload,
//       }
//     },
//     {
//       status: 'idle',
//       response: null,
//       error: null,
//     }
//   )

//   useEffect(() => {
//     let isCurrent = true
//     dispatch({ type: 'FETCH' })
//     promise()
//       .then((response: any) => {
//         if (!isCurrent) return
//         dispatch({ type: 'RESOLVE', payload: { response } })
//       })
//       .catch((error: any) => {
//         dispatch({ type: 'REJECT', payload: { error } })
//       })
//     return () => {
//       isCurrent = false
//     }
//   }, [promise])

//   return [state.response]
// }

import { useOptimistic, useState, useTransition } from 'react'
import { type ResponseData, updateDatabase } from './helpers/mockServer'

// Remember that useOptimistic will not work with <form onSubmit />, and requires
// <form action />

export function App() {
  const [error, setError] = useState('')
  const [likes, setLikes] = useState(0)

  // tracking the future
  const [opLikes, setOpLikes] = useOptimistic(likes, (_, nextValue: number) => {
    return nextValue
  })

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOpLikes(opLikes + 1)
    const data = (await updateDatabase(opLikes + 1).then((r) => r.json())) as ResponseData

    if (!data.error) {
      console.log(data.likes)
      setLikes(data.likes)
    } else {
      setError(data.error)
      setLikes(data.likes)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <button type="submit" className="button text-xl">
          Like My Post: {opLikes}
        </button>
      </div>
      {error && <div className="text-red-800">{error}</div>}
    </form>
  )
}

// // Step Two: home-made optimistic UI with transitions
// export function App() {
//   const [error, setError] = useState('')
//   const [likes, setLikes] = useState(0)

//   const [opLikes, setOpLikes] = useState(0)
//   const [pending, startTransition] = useTransition()

//   async function submit(e: React.FormEvent) {
//     e.preventDefault()

//     startTransition(() => {
//       setOpLikes(opLikes + 1)
//     })

//     const data = (await updateDatabase(opLikes + 1).then((r) => r.json())) as ResponseData

//     if (!data.error) {
//       console.log(data.likes)
//       setLikes(data.likes)
//     } else {
//       setLikes(data.likes)
//       setError(data.error)
//     }
//   }

//   return (
//     <form onSubmit={submit} className="space-y-6">
//       <div>
//         <button type="submit" className="button text-xl">
//           Like My Post: {opLikes}
//         </button>
//       </div>
//       {error && <div className="text-red-800">{error}</div>}
//     </form>
//   )
// }

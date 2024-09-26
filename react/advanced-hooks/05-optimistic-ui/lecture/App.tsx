import { useOptimistic, useState, useTransition } from 'react'
import { type ResponseData, updateDatabase } from './helpers/mockServer'

// Remember that useOptimistic will not work with <form onSubmit />, and requires
// <form action />

export function App() {
  const [error, setError] = useState('')
  const [likes, setLikes] = useState(0)

  async function submit(e: React.FormEvent) {
    e.preventDefault()

    const data = (await updateDatabase(likes + 1).then((r) => r.json())) as ResponseData
    setLikes(data.likes)
    console.log(data.likes)

    if (data.error) {
      setError(data.error)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <button type="submit" className="button text-xl">
          Like My Post: {likes}
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
//     setLikes(data.likes)
//     console.log(data.likes)

//     if (data.error) {
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

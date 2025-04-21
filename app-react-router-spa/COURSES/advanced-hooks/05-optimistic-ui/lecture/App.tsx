import { useOptimistic, useState } from 'react'
import { type ResponseData, updateDatabase } from './helpers/mockServer'

// Big Takeaways
// 1. Homegrown optimistic state works with onSubmit, not with actions
//    Plus it's hard to reconcile errors (see notes)
// 2. useOptimistic works with actions, not on submit unless we wrap our own transition
//    Refactor back to onSubmit, see error about transitions, add transition and it works

export function App() {
  const [error, setError] = useState('')
  const [likes, setLikes] = useState(0) // Reality

  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likes,
    (currentLikes, newOptimisticLikes: number) => {
      return newOptimisticLikes
    }
  )

  // If you use action (over onSubmit) you cant do opt ui
  async function action() {
    setOptimisticLikes(optimisticLikes + 1) // future

    const data = (await updateDatabase(optimisticLikes + 1).then((r) => r.json())) as ResponseData

    console.log('from the server', data.likes)
    setLikes(data.likes)

    if (data.error) {
      setError(data.error)
    }
  }

  return (
    <form action={action} className="space-y-6">
      <div>
        <button type="submit" className="button text-xl">
          Like My Post: {optimisticLikes}
        </button>
      </div>
      {error && <div className="text-red-800">{error}</div>}
    </form>
  )
}

// // Step Two: home-made optimistic UI
// export function App() {
//   const [error, setError] = useState('')
//   const [likes, setLikes] = useState(0)

//   const [opLikes, setOpLikes] = useState(0)

//   async function submit(e: React.FormEvent) {
//     e.preventDefault()

//     setOpLikes(opLikes + 1)

//     const data = (await updateDatabase(opLikes + 1).then((r) => r.json())) as ResponseData
//     setLikes(data.likes)

//     console.log(data.likes)

//     if (data.error) {
//       setOpLikes(data.likes)
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

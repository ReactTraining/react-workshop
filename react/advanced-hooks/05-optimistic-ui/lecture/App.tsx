import { useOptimistic, useState } from 'react'
import { type ResponseData, updateDatabase } from './helpers/mockServer'

// Big Takeaways
// 1. Homegrown optimistic state works with onSubmit, not with actions
//    Plus it's hard to reconcile errors (see notes)
// 2. useOptimistic works with actions, not on submit unless we wrap our own transition
//    Refactor back to onSubmit, see error about transitions, add transition and it works

export function App() {
  const [error, setError] = useState('')
  const [likes, setLikes] = useState(0) // reality of server

  // When settled, useOptimistic returns likes
  // when the action is running and we call setOpLikes, this function will return the return
  // of the callback
  const [opLikes, setOpLikes] = useOptimistic(likes, (currentLikes, newOptimisticLikes: number) => {
    return newOptimisticLikes
  })

  async function action() {
    setOpLikes(opLikes + 1) // 1
    const data = (await updateDatabase(opLikes + 1).then((r) => r.json())) as ResponseData
    setLikes(data.likes) // 1

    if (data.error) {
      setError(data.error)
    }
  }

  return (
    <form action={action} className="space-y-6">
      <div>
        <button type="submit" className="button text-xl">
          Like My Post: {opLikes}
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

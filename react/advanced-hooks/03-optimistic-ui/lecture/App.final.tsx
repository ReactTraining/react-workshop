import { useOptimistic, useState } from 'react'
import { type ResponseData, updateDatabase } from './helpers/mockServer'

export function App() {
  const [error, setError] = useState('')
  const [likes, setLikes] = useState(0)

  // likes: 4
  // optimistic likes: 6

  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likes,
    (currentLikes, newOptimisticLikes: number) => {
      return newOptimisticLikes
    }
  )

  async function action() {
    setOptimisticLikes(optimisticLikes + 1)
    const data = (await updateDatabase(optimisticLikes + 1).then((r) => r.json())) as ResponseData

    if (!data.error) {
      console.log(data.likes)
      setLikes(data.likes)
    } else {
      setLikes(data.likes)
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
      {/* <div>Optimistic Likes: {optimisticLikes}</div> */}
    </form>
  )
}

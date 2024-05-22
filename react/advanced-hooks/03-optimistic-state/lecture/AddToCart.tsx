import { useOptimistic, useState } from 'react'

export function AddToCart() {
  const [items, setItems] = useState(0)

  const [optimisticItems, setOptimisticItems] = useOptimistic(
    items,
    (currentItems, optimisticItems: number) => {
      return optimisticItems
    }
  )

  async function action() {
    setOptimisticItems(optimisticItems + 1)
    const newLikes = await updateDatabase(optimisticItems + 1)
    setItems(newLikes)
  }

  return (
    <form action={action} className="space-y-6">
      <div>
        <button type="submit" className="button text-xl">
          Add Item
        </button>
      </div>
      <div>Items: {items}</div>
      <div>Optimistic Items: {optimisticItems}</div>
    </form>
  )
}

// Function mimics slower network response times
async function updateDatabase(items: number) {
  await new Promise((res) => setTimeout(res, 2000))
  return items
}

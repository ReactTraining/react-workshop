import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { Heading } from '~/Heading'
import { LessonBody, LessonCard } from '~/Lesson'
import { GroceryForm } from './GroceryForm'
import { GroceryList } from './GroceryList'
import { Counter } from './Counter'

type Item = {
  id: number
  name: string
  quantity: number
}

function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'Eggs', quantity: 12 },
    { id: 2, name: 'Bread', quantity: 1 },
    { id: 3, name: 'Tomatoes', quantity: 3 },
  ])

  function addItem(item: Item) {
    setItems([...items, item])

    setItems(items.concat())
  }

  // Without Cloning (Faster, More Difficult)
  function subtractQuantity(id: number) {
    const index = items.findIndex((item) => item.id === id)
    const newItem = { ...items[index], quantity: items[index].quantity - 1 }
    if (newItem.quantity === 0) {
      setItems([...items.slice(0, index), ...items.slice(index + 1)])
    } else {
      setItems([...items.slice(0, index), newItem, ...items.slice(index + 1)])
    }
  }

  // With Cloning (Slower, Easier)
  function addQuantity(id: number) {
    const index = items.findIndex((item) => item.id === id)
    const newItems = structuredClone(items)
    newItems[index].quantity++
    setItems(newItems)
  }

  return (
    <LessonBody>
      <div className="flex gap-12">
        <LessonCard className="w-64">
          <Heading>Counter</Heading>
          <Counter />
        </LessonCard>
        <LessonCard className="flex-1">
          <div className="flex gap-12">
            <div className="w-56 space-y-6">
              <Heading>Add Item</Heading>
              <GroceryForm onSubmit={addItem} />
            </div>
            <div className="flex-1 space-y-6">
              <div>Filter Quantity: 1</div>
              <GroceryList
                items={items}
                subtractQuantity={subtractQuantity}
                addQuantity={addQuantity}
              />
            </div>
          </div>
        </LessonCard>
      </div>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)

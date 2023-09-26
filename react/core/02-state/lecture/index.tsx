import * as ReactDOM from 'react-dom/client'
import { Heading } from '~/Heading'
import { LessonBody, LessonCard } from '~/Lesson'
import { GroceryForm } from './GroceryForm'
import { GroceryList } from './GroceryList'
import { Counter } from './Counter'

function App() {
  return (
    <LessonBody>
      <div className="flex gap-12">
        <LessonCard>
          <Heading>Counter</Heading>
          <Counter />
        </LessonCard>
        <LessonCard className="flex-1">
          <div className="flex gap-12">
            <div className="w-56 space-y-6">
              <Heading>Add Item</Heading>
              <GroceryForm onSubmit={() => {}} />
            </div>
            <div className="flex-1 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <Heading>Grocery List</Heading>
                </div>
                <div>Filter Quantity: 1</div>
              </div>
              <GroceryList />
            </div>
          </div>
        </LessonCard>
      </div>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)

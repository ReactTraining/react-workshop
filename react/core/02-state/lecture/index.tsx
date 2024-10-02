import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Counter } from './Counter'

function App() {
  const [count, setCount] = useState(0)

  const [vacations, setVacation] = useState([
    { id: 1, name: 'Maui', hotels: 5 },
    { id: 2, name: 'Fiji', hotels: 2 },
    { id: 3, name: 'Cozumel', hotels: 3 },
    { id: 4, name: 'Crete', hotels: 5 },
    { id: 5, name: 'Florida Keys', hotels: 1 },
  ])

  const totalHotels = vacations.reduce((sum, item) => sum + item.hotels, 0)

  return (
    <LessonBody>
      <div className="flex gap-12">
        <LessonCard className="w-64">
          <Counter count={count} setCount={setCount} />
          <input
            type="range"
            min="0"
            max="5"
            step="1"
            className="w-full"
            value={count}
            onChange={(event) => {
              setCount(parseInt(event.target.value))
            }}
          />
        </LessonCard>
        <LessonCard className="flex-1">
          <div className="space-y-3">
            <div className="font-bold text-small">Hotels: {totalHotels}</div>

            {vacations
              .filter((vacation) => vacation.hotels >= count)
              .map((vacation) => {
                return (
                  <div key={vacation.id}>
                    <div className="flex gap-6 items-center bg-slate-100 p-4">
                      <div className="flex-1">{vacation.name}</div>
                      <div className="flex-1">Hotels: {vacation.hotels}</div>
                    </div>
                  </div>
                )
              })}
          </div>
        </LessonCard>
      </div>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)

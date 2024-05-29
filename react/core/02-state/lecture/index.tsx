import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Counter } from './Counter'

// A nice visual explanation of keys
// https://twitter.com/dan_abramov/status/1415279090446204929

function App() {
  const vacations = [
    { id: 1, name: 'Maui', hotels: 5 },
    { id: 2, name: 'Fiji', hotels: 2 },
    { id: 3, name: 'Cozumel', hotels: 3 },
    { id: 4, name: 'Crete', hotels: 5 },
    { id: 5, name: 'Florida Keys', hotels: 1 },
  ]

  // Do "reduce" for total hotels
  const totalHotels = 16

  return (
    <LessonBody>
      <div className="flex gap-12">
        <LessonCard className="w-64">
          <Counter />
          <input type="range" min="0" max="5" step="1" className="w-full" />
        </LessonCard>
        <LessonCard className="flex-1">
          <div className="space-y-3">
            <div className="font-bold text-small">Hotels: {totalHotels}</div>

            {/* Map */}
            <div>
              <div className="flex gap-6 items-center bg-slate-100 p-4">
                <div className="flex-1">Maui</div>
                <div className="flex-1">Hotels: 5</div>
              </div>
            </div>
            {/* End Map */}
          </div>
        </LessonCard>
      </div>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)

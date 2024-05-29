import { useState } from 'react'
import { ServerTwo } from './server-two'

export function ClientTwo() {
  const [count, setCount] = useState(0)
  return (
    <div className="bg-green-200 p-4 space-y-4">
      <div className="flex gap-2 items-center">
        <span>Client Two</span>
        <button className="button" onClick={() => setCount(count + 1)}>
          {count}
        </button>
      </div>
      <ServerTwo></ServerTwo>
    </div>
  )
}

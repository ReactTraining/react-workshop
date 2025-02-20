import { useState } from 'react'

type Props = {
  children?: React.ReactNode
}

export function ClientTwo({ children }: Props) {
  const [count, setCount] = useState(0)
  return (
    <div className="bg-green-200 p-4 space-y-4">
      <div className="flex gap-2 items-center">
        <span>Client Two</span>
        <button className="button" onClick={() => setCount(count + 1)}>
          {count}
        </button>
      </div>
      <div>{children}</div>
    </div>
  )
}

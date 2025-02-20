'use client'

import { useState } from 'react'
import { ClientTwo } from './client-two'

type Props = {
  children?: React.ReactNode
}

export function ClientOne({ children }: Props) {
  const [count, setCount] = useState(0)
  return (
    <div className="bg-blue-200 p-4 space-y-4">
      <div className="flex gap-2 items-center">
        <span>Client One</span>
        <button className="button" onClick={() => setCount(count + 1)}>
          {count}
        </button>
      </div>
      <ClientTwo>{children}</ClientTwo>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Heading } from '~/Heading'

function getSnapshot() {
  return navigator.clipboard.readText()
}

export function Clipboard() {
  const [text, setText] = useState('')

  useEffect(() => {
    getSnapshot().then(setText)
    const listener = () => {
      getSnapshot().then(setText)
    }
    document.addEventListener('copy', listener)
    return () => {
      document.removeEventListener('copy', listener)
    }
  }, [])

  return (
    <div className="flex gap-10">
      <div className="flex-1 space-y-3">
        <Heading size={3}>In your clipboard:</Heading>
        <hr />
        <div>{text}</div>
      </div>
      <div className="flex-1">
        Here's some stuff to copy: Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
        molestias vel consequuntur inventore temporibus accusantium architecto modi voluptatem
        tempora tempore fugit esse et laboriosam, adipisci commodi quaerat, hic atque explicabo.
      </div>
    </div>
  )
}

import { useSyncExternalStore, useEffect, useState } from 'react'
import { Heading } from '~/Heading'

function subscribe(callback: any) {
  document.addEventListener('copy', callback)
  return () => {
    document.removeEventListener('copy', callback)
  }
}

function getSnapshot() {
  return navigator.clipboard.readText().then((text) => text)
}

// Bring in the line of code below that calls useSyncExternalStore. Note that
// your browser might ask you permission for this website to read from your clipboard.
// Even when you grant permission, this code will not work. Can you figure out why?
// Is this an appropriate use-case for this hook? Why and who not?

// Refactor the code with useEffect instead to get it working. The instructor can
// discuss later as to why using useSyncExternalStore will not work for clipboard

export function Clipboard() {
  // const text = useSyncExternalStore(subscribe, getSnapshot)
  const text = 'temporary'

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

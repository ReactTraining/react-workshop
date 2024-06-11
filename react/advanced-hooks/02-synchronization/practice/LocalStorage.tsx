import { useSyncExternalStore, useCallback, useMemo } from 'react'
import { Heading } from '~/Heading'

// Make use of useSyncExternalStore() to subscribe to any localStorage
// changes. You can see the finished `setStorageValue` function that
// sets the storage and then dispatches a custom event. We have all
// the code you need to subscribe to that event, unsubscribe, and
// get the current value (for the snapshot) in the comments below.
// Your task is the integrate them into useSyncExternalStore()

const STORAGE_KEY = 'myStorageKey'

// 1. Getting the current localStorage value
// localStorage.getItem(STORAGE_KEY)

// 2. Subscribe to local storage changes
// window.addEventListener('STORAGE_EVENT', (event: any) => {
//   callback(event.detail)
// })

// 3. Remove the event listener
// window.removeEventListener('STORAGE_EVENT', callback)

export function LocalStorage() {
  // Call: useSyncExternalStore(subscribeFn, getSnapShotFn)
  const text = ''

  // Don't change this fn.
  function setStorageValue(event: React.MouseEvent<HTMLButtonElement>) {
    // Get the text from the button
    const text = event.currentTarget.innerHTML
    // Set text to localStorage
    localStorage.setItem(STORAGE_KEY, text)
    // Emit an event which we can subscribe to. You can see where we can
    // subscribe to this event on line 17 above
    dispatchEvent(
      new CustomEvent('STORAGE_EVENT', {
        detail: text,
      })
    )
  }

  return (
    <div className="flex gap-10">
      <div className="flex-1 space-y-3">
        <Heading size={3}>LocalStorage:</Heading>
        <hr />
        <div>{text || <i>No storage content for key: {STORAGE_KEY}</i>}</div>
      </div>
      <div className="flex-1 space-y-3">
        <button className="button block" onClick={setStorageValue}>
          🇬🇧 Hello
        </button>
        <button className="button block" onClick={setStorageValue}>
          🇪🇸 Hola
        </button>
        <button className="button block" onClick={setStorageValue}>
          🇫🇷 Salut
        </button>
        <button className="button block" onClick={setStorageValue}>
          🇮🇳 नमस्ते
        </button>
      </div>
    </div>
  )
}

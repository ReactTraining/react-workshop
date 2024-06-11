import { useSyncExternalStore } from 'react'
import { Heading } from '~/Heading'

const STORAGE_KEY = 'myStorageKey'

function subscribe(callback: any) {
  window.addEventListener('STORAGE_EVENT', (event: any) => {
    callback(event.detail)
  })
  return () => {
    window.removeEventListener('STORAGE_EVENT', callback)
  }
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY)
}

export function LocalStorage() {
  const text = useSyncExternalStore(subscribe, getSnapshot)

  function setStorageValue(event: React.MouseEvent<HTMLButtonElement>) {
    const text = event.currentTarget.innerHTML
    localStorage.setItem(STORAGE_KEY, text)
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

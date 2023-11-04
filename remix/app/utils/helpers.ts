import { createContext, useContext } from 'react'

// Sorts an array of objects by the object's label
export function sortLabel<T extends { label: string }>(a: T, b: T) {
  return a.label < b.label ? -1 : 1
}

// Usage: somePromise().then(sleep(2000))
export function sleep(ms = 1000) {
  return <T>(value: T): Promise<T> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(value), ms)
    })
  }
}

// For type-safe context for outlets (the built in ones aren't type safe)
// https://github.com/remix-run/react-router/pull/8805
export function createOutletContext<T>() {
  const Context = createContext<T>(null!)
  return { Provider: Context.Provider, useContext: () => useContext<T>(Context) }
}

// Custom TS utility to unpack loader return types
// Usage: UnpackLoader<typeof loader>

// Not needed anymore since Remix 2.0 fixed loader types
// export type UnpackLoader<T extends (...args: any) => any> = Awaited<
//   ReturnType<Pick<Awaited<ReturnType<T>>, 'json'>['json']>
// >

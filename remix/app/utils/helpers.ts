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

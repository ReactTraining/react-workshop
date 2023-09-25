// Usage: somePromise().then(sleep(2000))
export function sleep(ms = 1000) {
  return <T>(value: T): Promise<T> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(value), ms)
    })
  }
}

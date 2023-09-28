// Usage: somePromise().then(sleep(2000))
export function sleep(ms = 1000) {
  return <T>(value: T): Promise<T> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(value), ms)
    })
  }
}

// Mimic having a very slow function...
export function slowFunction(x: any) {
  for (let index = 0; index < 800_000_000; index++) {
    // just being slow, nothing to see here
  }
}

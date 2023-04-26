let count = { i: 0 }

export function reallyLongRunningFunction(): void {
  for (let i = 0; i < 1000000000; i++) {
    // Nothing to see here. Just a slow function
    count.i = parseInt(String(i), 10)
  }
}

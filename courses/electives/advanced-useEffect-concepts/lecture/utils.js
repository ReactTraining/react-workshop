export function reallyLongRunningFunction() {
  for (let i = 0; i < 1000000000; i++) {
    // Nothing to see here. Just a slow function
  }
}

let databaseClaps = 0

export function saveClapsToDatabase(claps) {
  databaseClaps += claps
  return Promise.resolve(databaseClaps)
}

let databaseClaps = 0

export function saveClapsToDatabase(claps) {
  databaseClaps += claps
  return Promise.resolve(databaseClaps)
}

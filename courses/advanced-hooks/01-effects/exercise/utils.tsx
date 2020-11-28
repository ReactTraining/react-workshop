let databaseClaps = 0

export function saveClapsToDatabase(claps: number) {
  databaseClaps += claps
  return Promise.resolve(databaseClaps)
}

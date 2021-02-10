// Fake an auto-incrementing database id
let incrementId = 2

export function createBoard(name: string) {
  return { id: ++incrementId, name }
}

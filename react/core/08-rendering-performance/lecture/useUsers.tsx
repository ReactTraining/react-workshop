const RECORDS = 1000

const users: any[] = []

for (let i = 0; i < RECORDS; i++) {
  const id = i + 1
  const likes = Math.floor(Math.random() * 10)
  const user = {
    id,
    name: `User ${id}`,
    likes,
  }
  users.push(user)
}

export function useUsers() {
  return users
}

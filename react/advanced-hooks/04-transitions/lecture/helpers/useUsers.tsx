import { useMemo } from 'react'

export type UserType = {
  id: number
  name: string
  likes: number
}

export function useUsers(count = 1000) {
  const users: UserType[] = useMemo(() => {
    return [...new Array(count).keys()].map((n) => {
      const id = n + 1
      const likes = Math.floor(Math.random() * 10)
      return {
        id,
        name: `User ${id}`,
        likes,
      }
    })
  }, [count])

  return users
}

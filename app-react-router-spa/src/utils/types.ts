// export type Nullish = null | undefined | 0 | ''

export type User = {
  id: number
  name: string
  username: string
  avatarUrl: string | null
}

export type Vacation = {
  id: number
  name: string
  price: number
  related: number[]
}

export type ChatMessage = {
  id: string
  user: string
  userId: number
  text: string
  created: number
  avatarUrl: string
}

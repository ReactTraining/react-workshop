export type User = {
  userId: number
  username: string
  name: string
  password: string
  avatarUrl: string | null
}

export type CardList = {
  cardListId: number
  name: string
  cardIds: number[]
}

export type Card = {
  id: number
  boardId: number
  name: string
}

export type Board = {
  id: number
  userId: number
  name: string
  cardLists: CardList[]
  cards: Card[]
}

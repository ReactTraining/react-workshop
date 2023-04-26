const url = 'http://localhost:3333'

/****************************************
 Users
*****************************************/

export type UserType = {
  id: number
  username: string
  avatarUrl: string
}

export async function getUser(userId: number): Promise<UserType> {
  const user = await fetch(`${url}/users/${userId}`)
    .then((res) => res.json())
    .then((user) => {
      delete user.passwordHash
      return user as UserType
    })
  return user
}

export async function createUser(username: string, passwordHash: string) {
  const userId = (await fetch(`${url}/users`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, passwordHash }),
  })
    .then((res) => res.json())
    .then((user) => user.id)) as number
  return userId
}

export async function usernameExists(username: string) {
  const users = await fetch(`${url}/users?username=${username}`).then((res) => res.json())
  return !!users[0]
}

export async function getUserPasswordHash(username: string) {
  const users = (await fetch(`${url}/users?username=${username}`).then((res) => res.json())) || []
  if (Array.isArray(users) && users.length === 1) {
    return {
      id: users[0].id as number,
      passwordHash: users[0].passwordHash as string,
    }
  }
  return null
}

/****************************************
  Products
*****************************************/

export type ProductType = {
  id: number
  name: string
  price: number
  image: string
}

export async function getProducts(): Promise<ProductType[]> {
  const products = await fetch(`${url}/products`).then((res) => res.json())
  return products
}

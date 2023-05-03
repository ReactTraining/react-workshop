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
  brand: string
  category: string
}

export async function getProducts(searchParams?: URLSearchParams): Promise<ProductType[]> {
  // convert: `brand=a&brand=b` to [['brand', 'a'], ['brand', 'b']]
  const brands =
    searchParams
      ?.get('brand')
      ?.split(',')
      ?.filter(Boolean)
      .map((brand) => ['brand', brand]) || []

  const categories =
    searchParams
      ?.get('category')
      ?.split(',')
      ?.filter(Boolean)
      .map((category) => ['category', category]) || []

  const search = new URLSearchParams([...brands, ...categories]).toString()

  return await fetch(`${url}/products?${search || ''}`).then((res) => res.json())
}

export async function getProduct(productId: number) {
  return (await fetch(`${url}/products?id=${productId}`)
    .then((res) => res.json())
    .then((arr) => arr[0])) as ProductType | undefined
}

export async function getRelatedProducts(brand: string, limit = 100, omitIds?: number[]) {
  if (!brand) return []
  const all = (await fetch(`${url}/products?brand=${brand}`).then((res) =>
    res.json()
  )) as ProductType[]
  return all
    .filter((product) => Array.isArray(omitIds) && !omitIds.includes(product.id))
    .slice(0, limit)
}

/****************************************
  Product Brands
*****************************************/

export type BrandType = {
  id: number
  handle: string
  label: string
}

export async function getBrands(): Promise<BrandType[]> {
  const brands = await fetch(`${url}/brands`).then((res) => res.json())
  return brands
}

/****************************************
  Product Categories
*****************************************/

export type CategoryType = {
  id: number
  handle: string
  label: string
}

export async function getCategories(): Promise<BrandType[]> {
  const categories = await fetch(`${url}/categories`).then((res) => res.json())
  return categories
}

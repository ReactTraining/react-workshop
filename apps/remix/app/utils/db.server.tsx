export type ProductType = {
  id: number
  name: string
  price: number
  image: string
}

export async function getProducts(): Promise<ProductType[]> {
  const products = await fetch('http://localhost:3333/products').then((res) => res.json())
  return products
}

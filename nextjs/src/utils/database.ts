const products = [
  { id: 1, name: 'iPhone', price: 879.0 },
  { id: 2, name: 'Google Pixel', price: 799.0 },
]

export type Product = (typeof products)[0]

// Fake, just to prove a point about RSC
export async function query(sql: string, ms = 1000) {
  await new Promise((res) => setTimeout(res, ms))
  // Pretends to resolve database results for products
  return products
}

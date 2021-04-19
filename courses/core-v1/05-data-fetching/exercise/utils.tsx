import { get } from 'YesterTech/api/utils'

export async function getCategories(): Promise<string[]> {
  const products = (await get('/products')) as { category?: string }[]
  const categories = products.reduce<string[]>(
    (categories, product) => categories.concat([product.category || '']),
    []
  )
  return [...new Set(categories)]
}

export function getInt(val: string | number, radix: number = 10) {
  return typeof val === 'number' ? val : parseInt(val, radix)
}

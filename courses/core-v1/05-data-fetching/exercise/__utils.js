import { get } from 'YesterTech/api/utils'

export async function getCategories() {
  const products = await get('/products')
  const categories = products.reduce(
    (categories, product) => categories.concat([product.category || '']),
    []
  )
  return [...new Set(categories)]
}

export function getInt(val, radix) {
  return typeof val === 'number' ? val : parseInt(val, radix)
}

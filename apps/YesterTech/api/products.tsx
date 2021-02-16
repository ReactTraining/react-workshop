import queryString from 'query-string'
import { get, getRaw, post } from 'YesterTech/api/utils'
import { Product, ProductId } from 'YesterTech/types'

type ProductQuery = {
  categories?: string | undefined | null
  brands?: string | undefined | null
  conditions?: string | undefined | null
}

export async function getProducts(
  search: ProductQuery = {},
  page = 1
): Promise<{ products: Product[]; totalResults: number }> {
  // If setting up this search object seems a little weird, we're
  // just conforming to the funky API or JSON-Server
  const realSearch = {
    ...search,
    _limit: 10,
    _page: page,
    page: undefined,
    category: search.categories ? search.categories.split(',') : undefined,
    brand: search.brands ? search.brands.split(',') : undefined,
    condition: search.conditions ? search.conditions.split(',') : undefined,
  }

  const query = queryString.stringify(realSearch || {})

  const res = await getRaw(`/products?${query}`)
  const products = await res.json()
  return {
    products,
    totalResults: parseInt(res.headers.get('x-total-count')!, 10),
  }
}

export async function getProduct(productId: ProductId): Promise<Product> {
  return await get(`/products/${productId}`)
}

export async function addProduct(data: Product): Promise<Product> {
  return await post(`/products`, data)
}

export async function getMetaData(): Promise<{
  categories: string[]
  brands: string[]
}> {
  const products: Product[] = await get('/products')
  const categories = products.reduce<string[]>((c, p) => c.concat([p.category || '']), [])
  const brands = products.reduce<string[]>((b, p_1) => b.concat([p_1.brand || '']), [])
  return {
    categories: [...new Set(categories)],
    brands: [...new Set(brands)],
  }
}

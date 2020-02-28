import queryString from 'query-string'
import { get, getRaw, post } from './utils'

export async function getProducts(search = {}, page = 1) {
  // If setting up this search object seems a little weird, we're
  // just conforming to the funky API or JSON-Server
  search = {
    ...search,
    _limit: 10,
    _page: page,
    page: undefined,
    category: search.categories ? search.categories.split(',') : undefined,
    brand: search.brands ? search.brands.split(',') : undefined,
    condition: search.conditions ? search.conditions.split(',') : undefined
  }

  const query = queryString.stringify(search || {})

  const res = await getRaw(`/products?${query}`)
  const products = await res.json()
  return {
    products,
    totalResults: parseInt(res.headers.get('x-total-count'), 10)
  }
}

export function getProduct(productId) {
  return get(`/products/${productId}`)
}

export function addProduct(data) {
  return post(`/products`, data)
}

export function getMetaData() {
  return get('/products').then(products => {
    const categories = products.reduce((c, p) => c.concat([p.category || '']), [])
    const brands = products.reduce((b, p) => b.concat([p.brand || '']), [])

    return {
      categories: [...new Set(categories)],
      brands: [...new Set(brands)]
    }
  })
}

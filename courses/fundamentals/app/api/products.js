import { get, getRaw, post } from './utils'
import queryString from 'query-string'

export async function getProducts(search, page = 1) {
  search = {
    ...search,
    _limit: 10,
    _page: page,
    page: undefined,
    category: search.categories ? search.categories.split(',') : undefined,
  }

  const query = queryString.stringify(search || {})

  const res = await getRaw(`/products?${query}`)
  const products = await res.json()
  return {
    products,
    totalResults: parseInt(res.headers.get('x-total-count'), 10),
  }
}

export function getProduct(productId) {
  return get(`/products/${productId}`)
}

export function addProduct(data) {
  return post(`/products`, data)
}

export function getCategories() {
  return get('/products')
    .then(products =>
      products.reduce((categories, product) => categories.concat([product.category || '']), [])
    )
    .then(categories => [...new Set(categories)])
}

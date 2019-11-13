import { get, getRaw, post } from './utils'
import queryString from 'query-string'

export async function getProducts(search, page = 1) {
  search = { ...search, _page: page, _limit: 10 }
  const query = queryString.stringify(search || {})

  const res = await getRaw(`/products?${query}`)
  const products = await res.json()
  return {
    products,
    total: parseInt(res.headers.get('x-total-count'), 10),
  }
}

export function getProduct(productId) {
  return get(`/products/${productId}`)
}

export function addProduct(data) {
  return post(`/products`, data)
}

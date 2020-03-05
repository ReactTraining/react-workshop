import { get } from 'YesterTech/api/utils'
import queryString from 'query-string'

export function getProducts() {
  const query = queryString.stringify({
    _limit: 10
  })
  return get(`/products?${query}`)
}

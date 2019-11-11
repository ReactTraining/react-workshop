import { get, post } from './utils'

export function getProducts() {
  return get(`/products`)
}

export function getProduct(productId) {
  return get(`/products/${productId}`)
}

export function addProduct(data) {
  return post(`/products`, data)
}

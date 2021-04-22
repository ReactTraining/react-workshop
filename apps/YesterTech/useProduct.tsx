import * as React from 'react'
import usePromise from 'YesterTech/usePromise'
import api from 'YesterTech/api'
import type { Product } from 'YesterTech/types'

export function useProduct(productId: number): Product | null {
  const getProduct = React.useCallback(() => api.products.getProduct(productId), [productId])
  const [product] = usePromise(getProduct)
  return product
}

export default useProduct

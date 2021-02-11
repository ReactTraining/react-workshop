import { useState, useEffect } from 'react'
import { get } from 'YesterTech/api/utils'
import queryString from 'query-string'

function getProducts() {
  const query = queryString.stringify({
    _limit: 3
  })
  return get(`/products?${query}`)
}

export function useProducts() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    let isCurrent = true
    getProducts().then(products => {
      if (!isCurrent) return
      setProducts(products)
    })
    return () => (isCurrent = false)
  }, [])

  return products
}

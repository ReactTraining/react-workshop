import { useState, useEffect } from 'react'
import { get } from 'YesterTech/api/utils'
import queryString from 'query-string'

function getProducts(limit = 3) {
  const query = queryString.stringify({
    _limit: limit,
  })
  return get(`/products?${query}`)
}

export function useProducts(limit = 3) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    let isCurrent = true
    getProducts(limit).then((products) => {
      if (!isCurrent) return
      setProducts(products)
    })
    return () => {
      isCurrent = false
    }
  }, [limit])

  return products
}

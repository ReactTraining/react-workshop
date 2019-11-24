import { useEffect, useState } from 'react'
import api from '../api'

export default function useProducts(search) {
  const [products, setProducts] = useState(null)
  const [totalResults, setTotalResults] = useState(0)

  useEffect(() => {
    let isCurrent = true

    api.products.getProducts(search).then(({ products, total }) => {
      if (!isCurrent) return
      setProducts(products)
      setTotalResults(total)
    })

    return () => (isCurrent = false)
  }, [search])

  return { products, totalResults }
}

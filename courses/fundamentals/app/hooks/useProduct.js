import { useEffect, useState } from 'react'
import api from '../api'

export default function useProduct(productId) {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    let isCurrent = true
    api.products.getProduct(productId).then(product => {
      if (!isCurrent) return
      setProduct(product)
    })
    return () => (isCurrent = false)
  }, [productId])

  return product
}

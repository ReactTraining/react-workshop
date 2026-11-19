'use client'

import type { Product } from '@/utils/database'
import { use } from 'react'

type Props = {
  productsPromise: Promise<Product[]>
}

export function ListProducts({ productsPromise }: Props) {
  const products = use(productsPromise)
  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            {product.name}: ${product.price}
          </div>
        )
      })}
    </div>
  )
}

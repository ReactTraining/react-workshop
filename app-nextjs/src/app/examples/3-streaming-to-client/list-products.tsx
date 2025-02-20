'use client'

import type { Product } from '@/utils/database'
import { use } from 'react'

type Props = {
  products: Product[]
}

export function ListProducts({ products }: Props) {
  // const products = use(productsPromise)
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

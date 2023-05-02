import { useOutletContext } from '@remix-run/react'
import { BrowseProducts } from '~/components/BrowseProducts'
import { type ProductType } from '~/utils/db.server'
import { type CartItemType } from '~/utils/cart.server'
import type { V2_MetaFunction } from '@remix-run/react'
import { ProductProfile } from '~/components/ProductProfile'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Tech Shopper' }]
}

type OutletContext = {
  products: ProductType[]
  cart: CartItemType[]
}

export default function () {
  const { products, cart } = useOutletContext<OutletContext>()
  const featuredProduct = products.slice(-1)[0]

  return (
    <>
      <div className="bg-white rounded-md p-6 shadow-sm">
        <ProductProfile
          id={featuredProduct.id}
          name={featuredProduct.name}
          image={featuredProduct.image}
          brand={''}
          brandHandle={featuredProduct.brand}
          category={''}
          categoryHandle={featuredProduct.category}
          price={featuredProduct.price}
          quantityInCart={0}
        />
      </div>
      <BrowseProducts products={products} cart={cart} />
    </>
  )
}

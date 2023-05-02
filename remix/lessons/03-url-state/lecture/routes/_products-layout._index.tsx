import { useOutletContext } from '@remix-run/react'
import { BrowseProducts } from '~/components/BrowseProducts'
import { type ProductType } from '~/utils/db.server'
import { type CartItemType } from '~/utils/cart.server'
import type { V2_MetaFunction } from '@remix-run/react'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Tech Shopper' }]
}

type OutletContext = {
  products: ProductType[]
  cart: CartItemType[]
}

export default function () {
  const { products, cart } = useOutletContext<OutletContext>()

  return (
    <>
      <div className="bg-slate-300/10 rounded-md h-72 border"></div>
      <BrowseProducts products={products} cart={cart} />
    </>
  )
}

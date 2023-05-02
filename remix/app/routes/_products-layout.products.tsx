import { useOutletContext } from '@remix-run/react'
import { BrowseProducts } from '~/components/BrowseProducts'
import { type ProductType } from '~/utils/db.server'
import { type CartItemType } from '~/utils/cart.server'
import type { LoaderArgs } from '@remix-run/node'
import type { V2_MetaFunction } from '@remix-run/react'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Products' }]
}

type OutletContext = {
  products: ProductType[]
  cart: CartItemType[]
}

export default function () {
  const { products, cart } = useOutletContext<OutletContext>()
  return (
    <>
      <header className="flex justify-between items-center">
        <div className="">
          <b>Products: {products.length}</b>
        </div>
        <div className="">[Filter]</div>
      </header>
      <BrowseProducts products={products} cart={cart} />
    </>
  )
}

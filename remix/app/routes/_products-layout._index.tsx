import { json } from '@remix-run/node'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import { BrowseProducts } from '~/components/BrowseProducts'
import { Heading } from '~/components/Heading'
import { FilterByCheckbox } from '~/components/FilterByCheckbox'
import { type ProductType, getProducts } from '~/utils/db.server'
import { type CartItemType, getCart } from '~/utils/cart.server'
import type { LoaderArgs } from '@remix-run/node'
import type { V2_MetaFunction } from '@remix-run/react'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }]
}

type OutletContext = {
  products: ProductType[]
  cart: CartItemType[]
}

export default function () {
  const { products, cart } = useOutletContext<OutletContext>()

  return (
    <>
      <div className="bg-slate-300 rounded h-56"></div>
      <BrowseProducts products={products} cart={cart} />
    </>
  )
}

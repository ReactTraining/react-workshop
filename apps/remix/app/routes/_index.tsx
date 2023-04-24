import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { BrowseProducts } from '~/components/BrowseProducts'
import { Heading } from '~/components/Heading'
import { FilterByCheckbox } from '~/components/FilterByCheckbox'
import { getProducts } from '~/utils/db.server'
import { getCart } from '~/utils/cart.server'
import type { LoaderArgs } from '@remix-run/node'
import type { V2_MetaFunction } from '@remix-run/react'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }]
}

export const loader = async ({ params, request }: LoaderArgs) => {
  const [products, cart] = await Promise.all([getProducts(), getCart(request)])
  return json({ products, cart })
}

export default function () {
  const { products, cart } = useLoaderData<typeof loader>()

  return (
    <div>
      <div className="flex gap-6">
        <div className="w-72 p-6 border rounded-lg bg-white space-y-6">
          <section className="space-y-1">
            <Heading as="h2" size={4}>
              Filter By Type
            </Heading>
            <FilterByCheckbox filter="computer">Computers</FilterByCheckbox>
            <FilterByCheckbox filter="phone">Phones</FilterByCheckbox>
            <FilterByCheckbox filter="music">Music</FilterByCheckbox>
            <FilterByCheckbox filter="other">Other</FilterByCheckbox>
          </section>
          <section className="space-y-1">
            <Heading as="h2" size={4}>
              Filter By Brand
            </Heading>
            <FilterByCheckbox filter="apple">Apple</FilterByCheckbox>
            <FilterByCheckbox filter="microsoft">Microsoft</FilterByCheckbox>
            <FilterByCheckbox filter="google">Google</FilterByCheckbox>
          </section>
          <section className="space-y-3">
            <div className="flex justify-between items-center">
              <Heading as="h2" size={4}>
                Max Price
              </Heading>
              <div className="text-brandColor">
                <b>$5000</b>
              </div>
            </div>
            <input type="range" className="block w-full" />
            <div className="flex justify-between items-center">
              <div className="text-sm">$10</div>
              <div className="text-sm">$5000</div>
            </div>
          </section>
        </div>
        <div className="flex-1 space-y-3">
          <header className="flex justify-between items-center">
            <div className="">
              <b>Products: {products.length}</b>
            </div>
            <div className="">[Filter]</div>
          </header>
          <BrowseProducts products={products} cart={cart} />
        </div>
      </div>
    </div>
  )
}

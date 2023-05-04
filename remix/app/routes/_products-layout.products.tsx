import { BrowseProducts } from '~/components/BrowseProducts'
import { V2_MetaFunction, useRouteLoaderData } from '@remix-run/react'
import type { LoaderData } from './_products-layout'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Products' }]
}

export default function () {
  const { products, cart } = useRouteLoaderData('routes/_products-layout') as LoaderData

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

import { BrowseProducts } from '~/components/BrowseProducts'
import { MetaFunction, useRouteLoaderData } from '@remix-run/react'
import type { LoaderData } from './_products-layout'

export const meta: MetaFunction = () => {
  return [{ title: 'Products' }]
}

export default function () {
  const { products } = useRouteLoaderData('routes/_products-layout') as LoaderData

  return (
    <>
      <header className="flex justify-between items-center">
        <div className="">
          <b>Products Found: {products.length}</b>
        </div>
        {/* <div className="">[Filter]</div> */}
      </header>
      <BrowseProducts products={products} />
    </>
  )
}

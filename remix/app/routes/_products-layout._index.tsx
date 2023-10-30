import { Link, useRouteLoaderData } from '@remix-run/react'
import { BrowseProducts } from '~/components/BrowseProducts'
import type { MetaFunction } from '@remix-run/react'
import type { LoaderData } from './_products-layout'

export const meta: MetaFunction = () => {
  return [{ title: 'Tech Shopper' }]
}

export default function () {
  const { products } = useRouteLoaderData('routes/_products-layout') as LoaderData

  return (
    <>
      <div className="rounded-md overflow-hidden relative h-72 bg-black">
        <div className="ml-[50%] p-6 text-white space-y-4">
          <div className="text-3xl">The New iPhone</div>
          <p>Remix your life with these fancy cameras</p>
          <div>
            <Link
              to="/products/6"
              className="inline-block py-2 px-4 text-white border border-white rounded-lg"
            >
              Buy Today
            </Link>
          </div>
        </div>
        <img src="/images/hero.png" alt="iphone hero" className="absolute left-0 bottom-0 w-1/2" />
      </div>
      <BrowseProducts products={products} />
    </>
  )
}

import { type MetaFunction, Link, useRouteLoaderData } from 'react-router'
import { BrowseProducts } from '~/components/BrowseProducts'
import type { LoaderData } from './products-layout'

export const meta: MetaFunction = () => {
  return [{ title: 'Tech Shopper' }]
}

export default function Page() {
  const { products } = useRouteLoaderData('routes/products-layout') as LoaderData

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

      {products && <BrowseProducts products={products} />}
    </>
  )
}

import { useRouteLoaderData, type MetaFunction } from 'react-router'
import { BrowseProducts } from '~/components/BrowseProducts'
import type { LoaderData } from './products-layout'

export const meta: MetaFunction = () => {
  return [{ title: 'Products' }]
}

export default function Page() {
  const { products } = useRouteLoaderData<LoaderData>('routes/products-layout')!

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

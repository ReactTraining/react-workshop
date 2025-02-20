import { useRouteLoaderData } from '@remix-run/react'
import { Tiles } from '~/components/Tiles'
import { Icon } from '~/components/Icon'
import { LoaderData } from './_products-layout'

export default function ProductsPage() {
  const { products } = useRouteLoaderData<LoaderData>('routes/_products-layout')!

  return (
    <Tiles>
      {products.map((product) => {
        return (
          <div
            key={product.id}
            className="p-3 rounded-lg bg-white shadow-sm overflow-hidden flex flex-col"
          >
            <img
              src={`/images/products/${product.image}`}
              alt={product.name}
              className="block object-contain h-52"
            />
            <div className="space-y-3 mt-3 border-t">
              <div className="mt-3 flex justify-between items-center">
                <div className="">{product.name}</div>
                <b className="block">${product.price}</b>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <button className="button button-outline whitespace-nowrap" type="submit">
                    <Icon name="cart" />
                  </button>
                </div>
                <div className="w-full flex flex-col">
                  <button className="button">View</button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </Tiles>
  )
}

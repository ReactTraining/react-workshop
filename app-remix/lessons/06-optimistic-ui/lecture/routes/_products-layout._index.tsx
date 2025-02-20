import { useRouteLoaderData } from '@remix-run/react'
import { Tiles } from '~/components/Tiles'
import { AddToCart, RemoveFromCart } from '../components/CartButtons'
import type { LoaderData as RootLoaderData } from '../root'
import type { LoaderData as ProductsLayoutLoaderData } from './_products-layout'

export default function ProductsIndex() {
  const { cart } = useRouteLoaderData<RootLoaderData>('root')!
  const { products } = useRouteLoaderData<ProductsLayoutLoaderData>('routes/_products-layout')!

  return (
    <Tiles>
      {products.map((product) => {
        const quantityInCart = cart?.find((c) => c.productId === product.id)?.quantity || 0
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
                <AddToCart productId={product.id} quantityInCart={quantityInCart} />
                {quantityInCart > 0 && <RemoveFromCart productId={product.id} />}
              </div>
            </div>
          </div>
        )
      })}
    </Tiles>
  )
}

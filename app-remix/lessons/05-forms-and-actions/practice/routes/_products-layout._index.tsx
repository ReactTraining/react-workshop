import { Form, useFetcher, useRouteLoaderData } from '@remix-run/react'
import { type ActionFunctionArgs } from '@remix-run/node'
import { Tiles } from '~/components/Tiles'
import { Icon } from '~/components/Icon'
import { addToCart, removeFromCart } from '~/utils/cart.server'
import { AddToCart, RemoveFromCart } from '../components/CartButtons'
import type { LoaderData as RootLoaderData } from '../root'
import type { LoaderData as ProductsLayoutLoaderData } from './_products-layout'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const productId = parseInt(formData.get('productId') as string)

  if (request.method === 'POST') {
    return await addToCart(request, productId, 1)
  } else if (request.method === 'DELETE') {
    return await removeFromCart(request, productId)
  }

  return null
}

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
                {/* Task 1 */}
                <button
                  type="submit"
                  className="button button-outline whitespace-nowrap"
                  aria-label="Add To Cart"
                >
                  <Icon name="cart" /> {quantityInCart > 0 && quantityInCart}
                </button>
                <button type="submit" className="button">
                  Remove
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </Tiles>
  )
}

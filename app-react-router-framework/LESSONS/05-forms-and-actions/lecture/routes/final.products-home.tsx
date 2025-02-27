import {
  useFetcher,
  useRouteLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from 'react-router'
import { Tiles } from '~/components/Tiles'
import { Icon } from '~/components/Icon'
import { sleep } from '~/utils/helpers'
import { addToCart, removeFromCart, getCart } from '~/utils/cart.server'
import type { LoaderData as RouteLoaderData } from './products-layout'
import type { Route } from './+types/final.products-home'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const productId = parseInt(formData.get('productId') as string)
  const quantity = parseInt(formData.get('quantity') as string)

  if (request.method === 'POST') {
    return await addToCart(request, productId, quantity)
  } else if (request.method === 'DELETE') {
    return await removeFromCart(request, productId)
  }

  return null
}

export async function loader({ request }: LoaderFunctionArgs) {
  const cart = await getCart(request)
  return { cart }
}

export default function Page({ loaderData: { cart } }: Route.ComponentProps) {
  const { products } = useRouteLoaderData<RouteLoaderData>('routes/products-layout')!

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

type AddProps = {
  productId: number
  quantityInCart?: number
}

function AddToCart({ productId, quantityInCart = 0 }: AddProps) {
  const fetcher = useFetcher()

  return (
    <fetcher.Form method="post">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value={quantityInCart + 1} />
      <button
        type="submit"
        className="button button-outline whitespace-nowrap"
        aria-label="Add To Cart"
      >
        <Icon name="cart" /> {quantityInCart > 0 && quantityInCart}
      </button>
    </fetcher.Form>
  )
}

type RemoveProps = {
  productId: number
}

function RemoveFromCart({ productId }: RemoveProps) {
  const fetcher = useFetcher()

  return (
    <fetcher.Form method="delete">
      <input type="hidden" name="productId" value={productId} />
      <button type="submit" className="button">
        Remove
      </button>
    </fetcher.Form>
  )
}

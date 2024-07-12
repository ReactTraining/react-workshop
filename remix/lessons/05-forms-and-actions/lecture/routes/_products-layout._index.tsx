import {
  Form,
  useFetcher,
  useNavigation,
  useLoaderData,
  useRouteLoaderData,
} from '@remix-run/react'
import { type ActionFunctionArgs, type LoaderFunctionArgs, json } from '@remix-run/node'
import { Tiles } from '~/components/Tiles'
import { Icon } from '~/components/Icon'
import { getCart } from '~/utils/cart.server'
import { addToCart, removeFromCart } from '~/utils/cart.server'
import type { LoaderData as RouteLoaderData } from './_products-layout'
import { sleep } from '~/utils/helpers'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const productId = parseInt((formData.get('productId') as string) || '')
  const quantity = parseInt((formData.get('quantity') as string) || '')

  if (request.method === 'POST') {
    return await addToCart(request, productId, quantity)
  } else if (request.method === 'DELETE') {
    return await removeFromCart(request, productId)
  }

  return null
}

export async function loader({ request }: LoaderFunctionArgs) {
  const cart = await getCart(request)
  return json({ cart })
}

export default function ProductsIndex() {
  const { cart } = useLoaderData<typeof loader>()
  const { products } = useRouteLoaderData<RouteLoaderData>('routes/_products-layout')!

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
                <div>{product.name}</div>
                <b className="block">${product.price}</b>
              </div>
              <div className="flex gap-2">
                <AddToCart productId={product.id} quantityInCart={quantityInCart} />
                <RemoveFromCart productId={product.id} />
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
  const addFetcher = useFetcher()
  const isSubmitting =
    addFetcher.state === 'submitting' &&
    addFetcher?.formData?.get('productId') === productId.toString()

  return (
    <addFetcher.Form method="POST">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value={quantityInCart + 1} />
      <button
        className="button button-outline whitespace-nowrap"
        type="submit"
        aria-label="Add To Cart"
      >
        <Icon name="cart" /> {quantityInCart > 0 && quantityInCart}
      </button>
    </addFetcher.Form>
  )
}

type RemoveProps = {
  productId: number
}

function RemoveFromCart({ productId }: RemoveProps) {
  const removeFetcher = useFetcher()

  return (
    <removeFetcher.Form method="DELETE">
      <input type="hidden" name="productId" value={productId} />
      <button className="button">Remove</button>
    </removeFetcher.Form>
  )
}
